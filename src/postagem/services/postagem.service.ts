import { TemaService } from './../../tema/services/tema.service';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Postagem } from "../entities/postagem.entity";

@Injectable()
export class PostagemService{

    constructor(

        @InjectRepository(Postagem)

        private postagemRepository: Repository<Postagem>,
        private TemaService: TemaService
    ) {}

    async findAll(): Promise<Postagem[]>{
        // SELECT * FROM tb_postagens;
        return await this.postagemRepository.find({

            relations: {

                tema: true,
                usuario: true
            }
        });
    }

    async findById(id: number): Promise<Postagem>{

        let buscaPostagem = await this.postagemRepository.findOne({
                    
            where:{
                id
            },
            relations: {
        
                tema: true,
                usuario: true
            }
        });

        if(!buscaPostagem)

            throw new HttpException('A Postagem não foi encontrada!', HttpStatus.NOT_FOUND);

        return buscaPostagem;
    }

    async findByTitulo(titulo: string): Promise<Postagem[]>{

    return await this.postagemRepository.find({

        where:{

            titulo: ILike(`%${titulo}%`)
        },

        relations: {

            tema: true,
            usuario: true
        }
    });

    }

    async create(postagem: Postagem): Promise<Postagem> {

        if(postagem.tema){

            await this.TemaService.findById(postagem.tema.id);

            return await this.postagemRepository.save(postagem);

        }

        return await this.postagemRepository.save(postagem);
        
    }

    async update(postagem: Postagem): Promise<Postagem> {
        
        let buscaPostagem = await this.findById(postagem.id);

        if(!buscaPostagem || !postagem.id)

            throw new HttpException('A Postagem não foi encontrada!', HttpStatus.NOT_FOUND)
           // se o usuário indicou o tema, verifica se o tema existe 
            if(postagem.tema){

                await this.TemaService.findById(postagem.tema.id);
    
                return await this.postagemRepository.save(postagem);
    
            }
            // se o usuário não indicou o tema, salva a postagem sem o tema
            return await this.postagemRepository.save(postagem);

    }

    async delete(id: number): Promise<DeleteResult>{

        let buscaPostagem = await this.findById(id)

        if(!buscaPostagem)

            throw new HttpException('A Postagem não foi encontrada!', HttpStatus.NOT_FOUND);

        return await this.postagemRepository.delete(id);
        
    }

}