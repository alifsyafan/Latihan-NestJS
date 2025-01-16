import { ApiProperty } from "@nestjs/swagger";
import { Jenis_Kelamin } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateMahasiswaDTO {

    @ApiProperty({ description : "NIM", type : String, example : "105841114422" })
    @IsString({message : "NIM harus bertipe String"})
    @IsNotEmpty({message : "Tidak boleh kosong"})
    @Length(1, 12, {message : "Hanya bisa sampai 12 karakter"})
    nim : string;

    @ApiProperty({description :"Nama", type : String, example : "Muhammad Alif Syafan"})
    @IsString({message : "Nama harus bertipe String"})
    @IsNotEmpty({message : "Tidak boleh kosong"})
    @Length(1, 50, {message : "Hanya bisa sampai 50 karakter"})
    nama : string;

    @ApiProperty({ description: "Kelas", type: String, example: "5D" })
    @IsString({ message: "Kelas harus bertipe String" })
    @IsNotEmpty({ message: "Tidak boleh kosong" })
    @Length(1, 2, { message: "Hanya bisa sampai 2 karakter" })
    kelas: string;

    @ApiProperty({ description: "Jurusan", type: String, example: "Informatika" })
    @IsString({ message: "Jurusan harus bertipe String" })
    @IsNotEmpty({ message: "Tidak boleh kosong" })
    @Length(1, 20, { message: "Hanya bisa sampai 12 karakter" })
    jurusan: string;

    @ApiProperty({
        enum: Jenis_Kelamin,
        description: "Jenis Kelamin",
        example: "L",
    })
    @IsEnum(Jenis_Kelamin, { 
        message: "Jenis Kelamin harus L atau P"
    })
    jenis_kelamin: Jenis_Kelamin;

}