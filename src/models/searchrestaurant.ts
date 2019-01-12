import * as Sequelize from "sequelize";


const POSTGRES_CONNECTION_STRING = process.env.POSTGRES_CONNECTION_STRING ||
    "postgres://dchnfekxwexvaa:5a7b2e17635b48fb319b2aefd26748abc51314d6abb299cb65aa0f8e5e60cbbb@ec2-184-72-239-186.compute-1.amazonaws.com:5432/dfkfhjbukjsco8";


export async function getRestaurant(nearby: {
    lat: number,
    long: number,
    radius: number,
    cuisine: string,
    timeofoperation: string
}){
    const sequelize = new Sequelize(
        POSTGRES_CONNECTION_STRING, {
            dialect: 'postgres',
            protocol: 'postgres',
            dialectOptions: {
                ssl: true
            }
        }
    );
    try {
        var res = await sequelize.query('select kmeal.get_nearby(:latitude, :longitude, :radius, :cuisine, :timeofoperation ) ',
                                    {  type: sequelize.QueryTypes.SELECT,
                                         replacements: { latitude: nearby.lat, longitude: nearby.long, radius: nearby.radius, cuisine: nearby.cuisine, timeofoperation: nearby.timeofoperation } }
                                   );
        return res.map(r => r.get_nearby);
    } catch(e) {
        console.log(e);
        throw new Error(e);
    } finally {
	      sequelize.close();
    }
}
