import { Body, Controller, Get, Param, Post, Delete, Patch, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/custom-deco/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService) {}

    // PUBLIC 게시물 가져오기
    @Get()
    getAllBoards(): Promise<Board[]> {
        return this.boardsService.getAllboards();
    }

    // @Get('/:id')
    // @UseGuards(AuthGuard())
    // getBoardByIdAndUser(
    //     @Param('id', ParseIntPipe) id: number,
    //     @GetUser() user: User
    // ): Promise<Board> {
    //     return this.boardsService.getBoardByIdAndUser(id, user);
    // }

    @Get('/user/all')
    @UseGuards(AuthGuard())
    getBoardsByUser(
        @GetUser() user: User
    ): Promise<Board[]> {
        return this.boardsService.getBoardsByUser(user);
    }

    @Post()
    @UsePipes(ValidationPipe)
    @UseGuards(AuthGuard())
    createBoard(
        @Body() createBoardDto: CreateBoardDto,
        @GetUser() user: User
    ): Promise<void> {
        return this.boardsService.creatBoard(createBoardDto, user);
    }

    @Delete('/:id')
    @UseGuards(AuthGuard())
    deleteBoard(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User
    ): Promise<void> {
        return this.boardsService.deleteBoard(id, user);
    }

    @Patch('/:id/status')
    @UseGuards(AuthGuard())
    updateBoardStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus,
        @GetUser() user: User
    ): Promise<void> {
        return this.boardsService.updateBoardStatus(id, status, user);
    }
}