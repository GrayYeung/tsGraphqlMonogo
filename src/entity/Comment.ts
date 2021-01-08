import {User} from "./User";
import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Field, Int, ObjectType} from "type-graphql";


@ObjectType()
@Entity()
export class Comment extends BaseEntity {

    @Field( () => Int)
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column()
    content: string

    @Field( () => User, {nullable: true})
    // @Column( () => User)
    @ManyToOne( () => User, {eager: true} )
    @JoinColumn({name: "user_id"})
    author: User
}