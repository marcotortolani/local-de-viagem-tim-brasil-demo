import { Container } from '@/components/Container'
import Subscribe from '@/components/subscribe/Subscribe'

export default async function Page() {
  return (
    <Container className='min-h-[80svh] pt-[8rem] '>
      <Subscribe />
    </Container>
  )
}
