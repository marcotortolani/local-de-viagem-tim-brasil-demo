import dynamic from 'next/dynamic'

const operatorCountry = process.env.NEXT_PUBLIC_OPERATOR_COUNTRY || 'test'

const TermsComponent = dynamic(
  () =>
    import(`@/app/(no-auth)/terminos-y-condiciones/${operatorCountry}/page`),
)

export default function Page() {
  return <TermsComponent />
}
