import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
// import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository
    ) {}

    async getAllboards(): Promise<Board[]> {
        const query = this.boardRepository.createQueryBuilder('board');
        query.where('board.status = :status',{status: 'PUBLIC'})
        const boards = await query.getMany();
        return boards;
    }

    async getBoardsByUser(user: User): Promise<Board[]> {
        const query = this.boardRepository.createQueryBuilder('board');
        query.where('board.userId = :userId',{userId: user.id})
        const boards = await query.getMany();
        return boards;
    }

    async getBoardById(id: number): Promise <Board> {
        const found = await this.boardRepository.findOneBy({id});
        if(!found) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }
        return found;
    }

    // async getBoardByIdAndUser(id: number, user: User): Promise <Board> {
    //     const board = await this.boardRepository.findOneBy({id});
    //     const found = user.boards.find(board => board.id == id);
    //     if(!board) {
    //         throw new NotFoundException(`Can't find Board with id ${id}`);
    //     }
    //     if(board.status === BoardStatus.PRIVATE && !found) {
    //         throw new UnauthorizedException(`Can't get other people's private board`);
    //     }
    //     return board;
    // }

    creatBoard(createBoardDto: CreateBoardDto, user: User): Promise<void> {
        return this.boardRepository.createBoard(createBoardDto, user);
    }

    async deleteBoard(id: number, user: User): Promise<void> {
        const found = user.boards.find(board => board.id == id);

        if(!found) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }
        
        await this.boardRepository.delete({id});
    }

    async updateBoardStatus(id: number, status: BoardStatus, user: User): Promise<void> {
        const found = user.boards.find(board => board.id == id);
        if(!found) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }

        const board = await this.getBoardById(id);
        board.status = status;
        await this.boardRepository.save(board);
    }
}