import { useEffect, useState } from 'react'
import { Button, Flex, Icon, Text, useTheme } from '@chakra-ui/react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

const PagButton = (props: any) => {
  const theme = useTheme()

  return (
    <Button
      variant="outline"
      mx={1}
      px={4}
      py={2}
      rounded="md"
      fontWeight="normal"
      sx={{
        '&[disabled]': {
          bg: theme.colors.white,
        },
        '&:hover[disabled]': {
          bg: theme.colors.white,
        },
      }}
      disabled={props.disabled}
      onClick={props.onClick}
      data-testid={props.id}
    >
      {props.children}
    </Button>
  )
}

export default function Pagination(props: any) {
  const { currentPage, nextBtnProps, prevBtnProps, numPages } = props
  const [pages, setPages] = useState<any>([])

  useEffect(() => {
    if (numPages === 1) return
    let arr = []
    for (let i = 1; i <= numPages; i += 1) {
      arr.push(i)
    }
    setPages(arr)
  }, [numPages]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!pages.length) return null

  return (
    <Flex
      wrap={'wrap'}
      justifyContent="center"
      mb={10}
      data-testid="pagination"
    >
      <PagButton {...prevBtnProps} id="prev-btn">
        <Icon as={IoIosArrowBack} boxSize={4} />
      </PagButton>
      <Flex
        justifyContent="center"
        alignItems="center"
        display={{
          base: 'flex',
          md: 'none',
        }}
        px={4}
      >
        <Text>
          {currentPage}/{numPages}
        </Text>
      </Flex>
      {pages.map((page: number, index: number) => (
        <Flex
          key={`page-${index}`}
          py={2}
          px={3}
          fontWeight={page === currentPage ? 'bold' : 'normal'}
          display={{
            base: 'none',
            md: 'block',
          }}
          className={page === currentPage ? 'active' : ''}
          data-testid={`page-${index + 1}`}
        >
          {page}
        </Flex>
      ))}
      <PagButton {...nextBtnProps} id="next-btn">
        <Icon as={IoIosArrowForward} boxSize={4} />
      </PagButton>
    </Flex>
  )
}
