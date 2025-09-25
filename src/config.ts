// config.ts

interface Config {
  apiUrl: string
  prodUrl: string
  landingSubscription: string
  chatbot: string
  endpointAdditionalComponents: string
}

export const buildConfigs: Record<string, Config> = {
  'tim-brasil': {
    apiUrl: 'http://content.br.tim.localdeviagem.moob.club/',
    prodUrl: '/',
    landingSubscription: '/subscribe',
    chatbot:
      'https://test.moob.club:8005/IA/br/tim/localdeviagem/chat/index.php',
    endpointAdditionalComponents: '',
  },
  test: {
    apiUrl: 'http://content.test.br.tim.localdeviagem.moob.club/',
    prodUrl: '/',
    landingSubscription: '/subscribe',
    chatbot:
      'https://test.moob.club:8005/IA/br/tim/localdeviagem/chat/index.php',
    endpointAdditionalComponents: '',
  },
}

// Función para obtener la configuración
export const getConfig = (operatorCountry = 'test') =>
  buildConfigs[operatorCountry] || buildConfigs['test']
