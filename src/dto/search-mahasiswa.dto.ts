import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class SearchMahasiswaDTO {

    @ApiProperty({
        description: "NIM Mahasiswa : ",
        type: String,
        example: "105841114422",
        required: false,
    })
    @IsOptional()
    @IsString()
    nim?: string;
}