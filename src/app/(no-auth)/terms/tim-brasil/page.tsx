import React from 'react'
import Link from 'next/link'
import { Container } from '@/components/Container'
import {
  TitleStyled,
  Title2Styled,
  ParagraphStyled,
} from '@/components/terms/text-elements'
import { getConfig } from '@/config'
import Breadcrumb from '@/components/ui/Breadcrumb'

import dictionary from '@/dictionary/lang.json'

const operatorCountry = process.env.NEXT_PUBLIC_OPERATOR_COUNTRY || 'test'
const { prodUrl: URL_SITE_PROD } = getConfig(operatorCountry)

export default async function Page() {
  return (
    <main className=" w-full h-full mt-[5rem] md:mt-[6rem] md:pt-2 pb-20 xl:pb-10 bg-white/10 ">
      <div className=" w-ful max-w-screen-xl mx-auto h-full my-2">
        <Breadcrumb homeElement={dictionary['Home']} />
      </div>
      <Container className="lg:max-w-screen-lg xl:max-w-screen-xl md:min-h-fit  px-4 lg:px-20 py-[2rem] pb-14 lg:py-14 bg-white rounded-lg">
        <div className=" relative w-full flex flex-col items-center gap-8">
          <section className="w-full flex flex-col gap-4">
            <TitleStyled>Termos e Condições</TitleStyled>
            <ParagraphStyled>
              Este documento estabelece os termos e condições que regem o uso do
              serviço denominado “{dictionary['site']}” (doravante o “Serviço”
              ou a “Opção de entretenimento”) oferecido por MOOB MEDIA BUSINESS,
              C.A (o “Prestador”), por meio do qual os usuários da Empresa
              Operadora S.A. – (doravante a “Operadora”) poderão acessar, a
              partir de seu dispositivo móvel, Tablet, laptop ou PC, conteúdo
              dedicado ao mundo das viagens, vídeos exclusivos de receitas,
              cultura e paladar, correspondentes, dicas de viagem e notas
              editoriais.
            </ParagraphStyled>
          </section>
          <section className=" w-full flex flex-col gap-4">
            <Title2Styled>O SERVIÇO: {dictionary['site']}</Title2Styled>
            <ParagraphStyled>
              {dictionary['site']} é um serviço de entretenimento que permite ao
              cliente acessar, por meio de um celular, Tablet ou computador,
              conteúdo dedicado ao mundo das viagens, vídeos exclusivos de
              receitas, cultura e paladar, correspondentes, dicas de viagem e
              notas editoriais, nas condições detalhadas nestes Termos e
              Condições.
            </ParagraphStyled>
            <ParagraphStyled>
              Nesse sentido, todos os clientes da Operadora que desejarem
              poderão assinar, solicitando sua adesão à opção de entretenimento
              através do envio de um SMS com o comando que for considerado
              válido para tal ação para o número **111** (o preço da mensagem é
              equivalente a uma mensagem de texto por uso).
            </ParagraphStyled>
            <ParagraphStyled>
              Ao enviar a palavra{' '}
              <span className="font-bold">
                ALTA, ou o comando que for comunicado para esta ação, para o
                número 111
              </span>
              , o cliente receberá um SMS com o link e as instruções de acesso
              ao portal, o preço do serviço, a frequência de cobrança e um PIN
              para acessar a opção de entretenimento. Após o acesso, poderá
              desfrutar ilimitadamente de todo o conteúdo que oferece{' '}
              {dictionary['site']}. Os encargos por navegação e transmissão de
              dados não estão incluídos no serviço. Os usuários também poderão
              assinar por meio do website da Operadora, na seção de opções de
              entretenimento digital, selecionando a opção “{dictionary['site']}
              ”, através da URL própria do serviço{' '}
              <Link
                className=" text-sky-600 "
                target="_blank"
                href={URL_SITE_PROD}
              >
                {URL_SITE_PROD}
              </Link>{' '}
              ou a partir de qualquer outra seção que a operadora disponibilizar
              para este fim.
            </ParagraphStyled>
            <ParagraphStyled>
              O Serviço é prestado na modalidade de **assinatura com renovação
              diária**, ou seja, de forma contínua desde a ativação do serviço
              pelo usuário, e até o momento em que este desejar solicitar o
              cancelamento do serviço. Para cancelar, o usuário deve enviar a
              palavra BAJA para o número 111 e receberá uma mensagem de
              confirmação.
            </ParagraphStyled>
            <ParagraphStyled>
              É um requisito indispensável para a utilização da assinatura que o
              usuário possua os serviços SMS e dados móveis ou WiFi ativados, um
              telefone móvel compatível e corretamente configurado. Os usuários
              deverão verificar esses aspectos previamente à solicitação do
              serviço.
            </ParagraphStyled>
            <ParagraphStyled>
              {dictionary['site']} enviará, a partir do número 111, uma mensagem
              de texto com as informações de acesso ao portal e o preço, pelo
              menos uma vez por mês. Adicionalmente, {dictionary['site']}{' '}
              enviará ao usuário mensagens de texto com informações relevantes
              nos períodos em que forem realizados sorteios, premiações e/ou
              atividades de interesse para o segmento.
            </ParagraphStyled>
            <ParagraphStyled>
              O uso do “Serviço” estará sujeito à aceitação e cumprimento destes
              Termos e Condições, o que ocorre a partir do momento em que o
              cliente assina o serviço. Serão também aplicáveis todas as
              condições particulares, avisos ou instruções de funcionamento que
              forem informadas ao usuário através do website da Operadora ou do
              Prestador, em relação ao “Serviço”.
            </ParagraphStyled>
          </section>
          <section className=" w-full flex flex-col gap-4">
            <Title2Styled>Âmbito do Serviço</Title2Styled>
            <ParagraphStyled>
              O “Serviço” está disponível em todo o **País da Operadora**, para
              toda pessoa física capaz de contratar, cuja linha telefônica móvel
              esteja ativa no momento da solicitação de ALTA ao mesmo.
            </ParagraphStyled>
            <ParagraphStyled>
              O conteúdo estará disponível para ser visualizado pelo usuário, a
              partir do momento em que este realizar sua alta com sucesso. O
              conteúdo poderá ser visualizado em qualquer terminal compatível,
              sendo necessários dados móveis ou uma conexão WiFi para tal.
            </ParagraphStyled>
            <ParagraphStyled>
              Todo Usuário que assinar o serviço e realizar os passos de
              autenticação necessários, declara e garante o pleno cumprimento
              destes Termos e Condições.
            </ParagraphStyled>
          </section>
          <section className=" w-full flex flex-col gap-4">
            <Title2Styled>
              Condições de Uso. Propriedade Intelectual
            </Title2Styled>
            <ParagraphStyled>
              Os usuários se obrigam a fazer um uso lícito do “Serviço” e do
              conteúdo ao qual acessem como resultado da “Assinatura”, em
              conformidade com a lei vigente aplicável e com estes Termos e
              Condições. Cabe aos Usuários respeitar as normas mencionadas,
              colocando ênfase especial nos direitos de propriedade intelectual
              e industrial, e abster-se de utilizar o “Serviço” com fins
              ilícitos ou de forma que atente ou viole direitos de terceiros ou
              do Prestador. Os Usuários serão os exclusivos responsáveis pelos
              danos ou prejuízos de qualquer natureza que possam derivar-se do
              uso incorreto, ilegítimo ou ilícito do “Serviço”.
            </ParagraphStyled>
            <ParagraphStyled>
              O Prestador é o único titular do conteúdo, e/ou recebeu dos
              respectivos titulares de tal conteúdo uma licença de uso. Todo o
              conteúdo que compõe a “Assinatura” está protegido por direitos
              autorais no âmbito da legislação vigente. O conteúdo pode ser
              utilizado pelos Usuários apenas na medida permitida por estes
              Termos e Condições e pela legislação aplicável.
            </ParagraphStyled>
            <ParagraphStyled>
              A menos que seja expressamente especificado o contrário, o
              conteúdo não poderá ser baixado para os dispositivos dos usuários.
            </ParagraphStyled>
          </section>
          <section className=" w-full flex flex-col gap-4">
            <Title2Styled>Responsabilidade</Title2Styled>
            <ParagraphStyled>
              A responsabilidade e a obrigação de pagamento pelo envio ou
              recebimento de mensagens de texto relacionadas à “Assinatura”
              serão de responsabilidade do titular do número móvel utilizado
              para tal fim, e não poderão ser opostas por{' '}
              <span className=" font-semibold">
                perda, furto, roubo, extravio ou avaria de tal equipamento móvel
              </span>
              , salvo denúncia prévia a qualquer envio ou recebimento destas
              mensagens, efetuada à Operadora através dos centros de atendimento
              desta última.
            </ParagraphStyled>
            <ParagraphStyled>
              O Prestador e a Operadora não poderão ser considerados
              responsáveis por nenhum dano ou prejuízo causado ou que possa ser
              causado aos Usuários ou a terceiros, em suas pessoas ou bens, pela
              contratação ou utilização do “Serviço”. Também não serão
              responsáveis em caso de insatisfação com o conteúdo do serviço.
              Nestes casos, os usuários serão livres para cancelar, enviando a
              palavra <span className=" font-semibold">BAJA ao número 111</span>
              .
            </ParagraphStyled>
            <ParagraphStyled>
              O Prestador não se responsabiliza por “Assinaturas” que não
              contenham os dados solicitados ou que contenham dados errôneos,
              nem pelas mensagens de texto que não incluam as palavras-chave
              estabelecidas para o acesso ao “Serviço”. Tampouco será
              responsável pelas solicitações ou envios que não sejam aceitos
              pela plataforma tecnológica do Prestador nem por atrasos que
              possam ocorrer nas visualizações de conteúdo, mensagens de texto
              ou qualquer outro envio relacionado à “Assinatura”, por qualquer
              causa não imputável ao Prestador, incluindo, mas sem se limitar a,
              falhas na conectividade da rede, excesso ou saturação do tráfego
              da rede, e/ou qualquer característica dos telefones móveis que
              impeça a transmissão de tais envios ou solicitações.
            </ParagraphStyled>
            <ParagraphStyled>
              O Prestador reserva-se o direito de efetuar, sem aviso prévio,
              todo tipo de modificação na mecânica da “Assinatura” com o único
              requisito de comunicar qualquer mudança de relevância no website e
              em outros meios.
            </ParagraphStyled>
          </section>
          <section className=" w-full flex flex-col gap-4">
            <Title2Styled>Jurisdição</Title2Styled>
            <ParagraphStyled>
              Toda relação que, em virtude deste “Serviço”, se gere entre os
              Usuários e o Prestador será regida e concertada em total sujeição
              às leis do **País da Operadora**, renunciando os Usuários a
              qualquer outra lei à cuja aplicação possa ter direito.
            </ParagraphStyled>
            <ParagraphStyled>
              Estes Termos e Condições são regidos pela lei do **País da
              Operadora**. Para qualquer controvérsia que possa derivar da
              prestação dos “Serviços” ou da interpretação e aplicação dos
              Termos e Condições, o Prestador e os Usuários aceitam submeter-se
              aos tribunais competentes do **País da Operadora** com expressa
              renúncia a qualquer outro foro ou jurisdição que lhes possa
              corresponder.
            </ParagraphStyled>
          </section>
        </div>
      </Container>
    </main>
  )
}
