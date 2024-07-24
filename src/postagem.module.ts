import { Module } from "@nestjs/common";
import { Postagem } from "./postagem/entities/postagem.entity"; // Update the import path
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostagemService } from "./postagem/services/postagem.service";
import { PostagemController } from "./postagem/controllers/postagem.controller";
import { TemaModule } from "./tema/entities/tema.module";
import { TemaService } from "./tema/services/tema.service";

@Module({
    imports: [TypeOrmModule.forFeature([Postagem]), TemaModule],
    providers: [PostagemService, TemaService],
    controllers: [PostagemController],
    exports: [TypeOrmModule]
})

export class PostagemModule { }