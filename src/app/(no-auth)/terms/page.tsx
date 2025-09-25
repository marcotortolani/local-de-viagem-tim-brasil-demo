import dynamic from 'next/dynamic'

const operatorCountry = process.env.NEXT_PUBLIC_OPERATOR_COUNTRY || 'test'

const TermsComponent = dynamic(
  () => import(`@/app/(no-auth)/terms/${operatorCountry}/page`),
)

export default function Page() {
  return <TermsComponent />
}
