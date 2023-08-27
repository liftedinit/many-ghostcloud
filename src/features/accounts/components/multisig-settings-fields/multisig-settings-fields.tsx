import React from 'react'
import { useFormContext, useController, get } from 'react-hook-form'
import {
  AccountFeatureTypes,
  AccountMultisigArgument,
} from '@liftedinit/many-js'
import {
  Box,
  Flex,
  FieldWrapper,
  Input,
  InputProps,
  RadioGroup,
  Radio,
  HStack,
  Select,
  getHoursMinutesSecondsFromSeconds,
  getSecondsFromHoursMinutesSeconds,
} from '@liftedinit/ui'
import { approverRoles, useGetAccountInfo } from 'features/accounts'

export function MultisigSettingsFields({
  accountAddress,
  canEdit = true,
  name = '',
  maxApprovers,
}: {
  accountAddress?: string
  canEdit?: boolean
  name?: string
  maxApprovers?: number
}) {
  const thresholdFieldName = name + 'threshold'
  const hoursFieldName = name + 'hours'
  const expireInSecsFieldName = name + 'expireInSecs'
  const minutesFieldName = name + 'minutes'
  const secondsFieldName = name + 'seconds'
  const executeAutomaticallyFieldName = name + 'executeAutomatically'
  const {
    setValue,
    register,
    watch,
    formState: { errors },
  } = useFormContext()

  const { field: radioField } = useController({
    name: executeAutomaticallyFieldName,
  })

  const { data: accountInfoData } = useGetAccountInfo(accountAddress)
  const accountInfo = accountInfoData?.accountInfo
  const featureKey = AccountFeatureTypes[AccountFeatureTypes.accountMultisig]
  const multisigFeature = accountInfo?.features?.get(featureKey) as Map<
    string,
    unknown
  >

  const _maxApprovers =
    (maxApprovers ??
      Array.from(accountInfo?.roles ?? [])?.reduce((acc, roleData) => {
        const [, roles] = roleData
        if (roles?.some(r => approverRoles.includes(r))) {
          acc += 1
        }
        return acc
      }, 0)) ||
    1

  const isInitialValuesSet = React.useRef(false)
  React.useEffect(
    function setInitialValues() {
      if (multisigFeature && !isInitialValuesSet.current) {
        isInitialValuesSet.current = true
        const currThreshold = multisigFeature.get(
          AccountMultisigArgument[AccountMultisigArgument.threshold],
        )
        setValue(thresholdFieldName, String(currThreshold))

        const currExpire = multisigFeature.get(
          AccountMultisigArgument[AccountMultisigArgument.expireInSecs],
        ) as number
        setValue(expireInSecsFieldName, currExpire)

        const { hours, minutes, seconds } =
          getHoursMinutesSecondsFromSeconds(currExpire)
        setValue(hoursFieldName, hours)
        setValue(minutesFieldName, minutes)
        setValue(secondsFieldName, seconds)

        const currExecuteAutomatically = multisigFeature.get(
          AccountMultisigArgument[AccountMultisigArgument.executeAutomatically],
        )
        setValue(executeAutomaticallyFieldName, currExecuteAutomatically)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [multisigFeature],
  )

  const commonNumberInputStyles: InputProps = {
    type: 'number',
    w: '70px',
    textAlign: 'center',
    isReadOnly: !canEdit,
  }

  const hours = watch(hoursFieldName)
  const minutes = watch(minutesFieldName)
  const seconds = watch(secondsFieldName)
  React.useEffect(() => {
    const expireInSecs = getSecondsFromHoursMinutesSeconds(
      hours || 0,
      minutes || 0,
      seconds || 0,
    )
    setValue(expireInSecsFieldName, expireInSecs)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hours, minutes, seconds])

  return (
    <>
      <FieldWrapper
        label="Required Approvers"
        description="The amount of approvers required to execute a transaction."
        isRequired
        error={get(errors, thresholdFieldName)?.message}
      >
        <Select
          focusBorderColor="teal.300"
          width={{ base: 'full', md: '100px' }}
          pointerEvents={canEdit ? undefined : 'none'}
          isReadOnly={!canEdit}
          data-testid="required approvers dropdown"
          {...register(thresholdFieldName, {
            valueAsNumber: true,
            required: 'This field is required',
          })}
        >
          {new Array(_maxApprovers).fill(1).map((num, idx) => {
            const val = num + idx
            return (
              <option key={val} value={val}>
                {val}
              </option>
            )
          })}
        </Select>
      </FieldWrapper>

      <FieldWrapper
        label="Transaction Expiration"
        description="The elapsed time after a transaction has been submitted before it is
          expired."
        isRequired
        error={
          get(errors, hoursFieldName)?.message ||
          get(errors, minutesFieldName)?.message ||
          get(errors, secondsFieldName)?.message
        }
      >
        <>
          <Input
            type="hidden"
            {...register(expireInSecsFieldName, { valueAsNumber: true })}
          />
          <HStack>
            <Flex>
              <Input
                {...commonNumberInputStyles}
                placeholder="H"
                {...register(hoursFieldName, {
                  min: { value: 0, message: 'Minimum of 0h required' },
                  required: 'Hours is required',
                  valueAsNumber: true,
                })}
              />
            </Flex>
            <Box>:</Box>
            <Box>
              <Input
                {...commonNumberInputStyles}
                placeholder="M"
                {...register(minutesFieldName, {
                  min: { value: 0, message: 'Minimum of 0h required' },
                  max: { value: 59, message: 'Maximum of 59m allowed' },
                  required: 'Minutes is required',
                  valueAsNumber: true,
                })}
              />
            </Box>
            <Box>:</Box>
            <Box>
              <Input
                {...commonNumberInputStyles}
                placeholder="S"
                {...register(secondsFieldName, {
                  min: { value: 0, message: 'Minimum of 0h required' },
                  max: { value: 59, message: 'Maximum of 59s allowed' },
                  valueAsNumber: true,
                  required: 'Seconds is required',
                })}
              />
            </Box>
          </HStack>
        </>
      </FieldWrapper>

      <FieldWrapper
        isRequired
        label="Execute Automatically"
        description="Execute transactions automatically when threshold has been reached."
        error={get(errors, executeAutomaticallyFieldName)?.message}
      >
        <RadioGroup
          colorScheme="brand.teal"
          {...radioField}
          value={radioField.value === false ? '0' : '1'}
          onChange={val => {
            radioField.onChange(val === '1')
          }}
        >
          <HStack spacing={4}>
            <Radio value="0" isReadOnly={!canEdit}>
              No
            </Radio>
            <Radio value="1" isReadOnly={!canEdit}>
              Yes
            </Radio>
          </HStack>
        </RadioGroup>
      </FieldWrapper>
    </>
  )
}
