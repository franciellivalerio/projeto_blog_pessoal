
import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Tema } from "../../tema/entities/tema.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: "tb_postagens"}) // Criando a Tabela

export class Postagem{

    @ApiProperty() // Documentação
    @PrimaryGeneratedColumn() 
    id: number;

    @ApiProperty()
    @Transform(({ value }: TransformFnParams) => value?.trim()) 
    @IsNotEmpty() 
    @Column({length: 100, nullable: false}) 
    titulo: string;
 
    @ApiProperty()
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 1000, nullable: false})
    texto: string;

    @ApiProperty()
    @UpdateDateColumn() 
    data: Date;

    @ApiProperty()
    @ManyToOne(() => Tema, (tema) => tema.postagem, {
        
        onDelete: "CASCADE"

    })
    tema: Tema;

    @ApiProperty()
    @ManyToOne(() => Usuario, (usuario) => usuario.postagem, {
        onDelete: "CASCADE"
    })
    usuario: Usuario;

}

