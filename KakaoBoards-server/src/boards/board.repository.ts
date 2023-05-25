import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from "typeorm";
import { Board } from "./board.entity";
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board-status.enum';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardRepository extends Repository<Board> {
    constructor(private dataSource: DataSource){
        super(Board, dataSource.createEntityManager());
    }

    async createBoard(createBoardDto: CreateBoardDto, user: User): Promise<void> {
        const{ title, description, status } = createBoardDto;
        const currentDate = new Date().toLocaleDateString();
        const currentTime = new Date().toLocaleTimeString();
        const board: Board = this.create({
            title,
            description,
            status: status,
            user,
            createDate: currentDate,
            createTime: currentTime
        })
        
        await this.save(board);
    }
}