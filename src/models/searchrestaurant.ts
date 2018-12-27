import * as Sequelize from "sequelize";


const POSTGRES_CONNECTION_STRING = process.env.POSTGRES_CONNECTION_STRING ||  "postgres://postgres:password@localhost:6432/postgres";

export async function getRestaurant(nearby: {
    lat: number,
    long: number,
    radius: number
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
        var res = await sequelize.query('select kmeal.get_nearby(:latitude, :longitude, :radius) ',
                                    {  type: sequelize.QueryTypes.SELECT,
                                         replacements: { latitude: nearby.lat, longitude: nearby.long, radius: nearby.radius } }
                                   );
        return res.map(r => r.get_nearby);
    } catch(e) {
        console.log(e);
        throw new Error(e);
    } finally {
	      sequelize.close();
    }
}
