import { Module } from "@nestjs/common";
import { Postagem } from "./postagem/entities/postagem.entity"; // Update the import path
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostagemService } from "./postagem/services/postagem.service";
import { PostagemController } from "./postagem/controllers/postagem.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Postagem])],
    providers: [PostagemService],
    controllers: [PostagemController],
    exports: [TypeOrmModule]
})

export class PostagemModule { }