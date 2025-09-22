// config.ts

interface Config {
  apiUrl: string
  prodUrl: string
  landingSubscription: string
  chatbot: string
  endpointAdditionalComponents: string
}

export const buildConfigs: Record<string, Config> = {
  'movistar-venezuela': {
    apiUrl: 'http://content.es.ve.movistar.queguay.moob.club/',
    prodUrl: 'http://ve.movistar.queguayviajes.com/',
    landingSubscription:
      'http://dinamic.ve.movistar.queguayviajes.com/landing/',
    chatbot: 'https://test.moob.club:8005/IA/queguayviajes/chat/',
    endpointAdditionalComponents:
      'https://test.moob.club:8002/config-portales/qgv-movistar-venezuela.json',
  },
  test: {
    // apiUrl: 'http://content.test.queguay.moob.club/',
    apiUrl: 'http://content.es.ve.movistar.queguay.moob.club/',
    prodUrl: 'http://ve.movistar.queguayviajes.com/',
    landingSubscription:
      'http://dinamic.ve.movistar.queguayviajes.com/landing/',
    chatbot: 'https://test.moob.club:8005/IA/queguayviajes/chat/',
    endpointAdditionalComponents:
      'https://test.moob.club:8002/config-portales/qgv-movistar-venezuela.json',
    // apiUrl: 'http://content.test.queguay.moob.club',
    // prodUrl: 'http://es.test.queguay.moob.club/',
    // landingSubscription: '/',
    // chatbot: 'https://test.moob.club:8005/IA/queguayviajes/chat/',
    // endpointAdditionalComponents:
    //   'https://test.moob.club:8002/config-portales/qgv-test.json',
  },
}

// Función para obtener la configuración
export const getConfig = (operatorCountry = 'test') =>
  buildConfigs[operatorCountry] || buildConfigs['test']
