import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Field, Int, ObjectType} from "type-graphql";


@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field( () => Int)
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column()
    name: string

    @Field()
    @Column()
    avatar: string

    // @Field( () => [Comment], {nullable: true})
    // @OneToMany( () => Comment, (comment: Comment) => comment.author, {
    //     onDelete: "CASCADE", onUpdate: "CASCADE"
    // })
    // comments: Array<Comment>

}