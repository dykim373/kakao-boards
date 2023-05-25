import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeORMConfig : TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 13306,
    username: 'root',
    password: 'root',
    database: 'kakaoboards-data',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true
}