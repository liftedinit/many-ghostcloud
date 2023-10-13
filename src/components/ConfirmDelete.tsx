import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { useRemoveDeployment } from 'features/deployments/queries'
import { useAccountsStore } from '../features/accounts'

export default function ConfirmDelete({
  onClose,
  isOpen,
  deployments,
  activeDeploymentUuid,
}: {
  onClose: () => void
  isOpen: boolean
  deployments: any
  activeDeploymentUuid: any
}) {
  const account = useAccountsStore(s => s.byId.get(s.activeId))

  const handleYes = () => {
    // TODO: Is there a better way of doing this?
    const currentDeployment = deployments.find(
      (deployment: any) => deployment.uuid === activeDeploymentUuid,
    )
    const removeData = {
      owner: account?.address,
      siteName: currentDeployment.siteName,
      memo: currentDeployment.memo,
    }
    removeDeploymentMutation.mutate(removeData)
    onClose()
  }

  const removeDeploymentMutation = useRemoveDeployment(account?.address)

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirm Delete</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Are you sure?</ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleYes}>
            Yes
          </Button>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            No
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
