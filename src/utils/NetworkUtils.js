import NetInfo from '@react-native-community/netinfo'
import { logger } from './logger';

export default class NetworkUtils {
    static async isNetworkAvailable () {
        const response = await NetInfo.fetch()
        logger.log(response);
        
        return response.isConnected
    }
}
