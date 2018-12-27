

// import { validate } from '../helpers/util';
// import * as Joi from 'joi';
import { getRestaurant } from '../models/searchrestaurant';

// const nearbyQueryOptional =
//     Joi.object().keys({
//         long: Joi.number(),
//         lat: Joi.number(),
//         radius: Joi.number().default(2)
//     });

export default {
    Query: {
        getRestaurantsNearby: async (_: any, { nearby }: {
            nearby: {
                lat: number,
                long: number,
                radius: number
            }
        }) => {
            try {
                //await validate(nearby, nearbyQueryOptional);
                return await getRestaurant(nearby);
            }
            catch (e) {
                throw new Error(e.ValidationError);
            }
        }
    }
}
