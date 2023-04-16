import { Controller, Get, Post, Res, HttpStatus, Body, Param } from '@nestjs/common';
import { PostalcodeDTO } from './dto/postalcode.dto';
import { PostalcodeService } from './postalcode.service';

@Controller('postalcode')
export class PostalcodeController {

    constructor(private postalcodeService: PostalcodeService) { }

    @Post('/create')
    createPostalcode(@Res() res, @Body() postalcodeDTO: PostalcodeDTO): string {
        return res.status(HttpStatus.OK).json({ message: 'accepted' })
    }

    @Post('/createpc')
    async create(@Res() res, @Body() createProductDTO: PostalcodeDTO) {
        console.log(createProductDTO)
        const product = await this.postalcodeService.createProduct(createProductDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Postalcode Successfully Created',
            product
        });
    }

    @Get('/state/:c_pais')
    async getStates(@Res() res, @Param('c_pais') c_pais: string): Promise<PostalcodeDTO[]> {
        let states = await this.postalcodeService.getStates(c_pais)
        return res.status(HttpStatus.OK).json(states)
    }

    @Get('/state/:c_pais/:c_state')
    async getMunicipaly(@Res() res, @Param('c_pais') c_pais: string, @Param('c_state') c_state: string): Promise<PostalcodeDTO[]> {
        let municipaly = await this.postalcodeService.getMunicipaly(c_pais, c_state)
        return res.status(HttpStatus.OK).json(municipaly)
    }

    @Get('/state/:c_pais/:c_state/:c_mnpio')
    async getColony(@Res() res,
        @Param('c_pais') c_pais: string,
        @Param('c_state') c_state: string,
        @Param('c_mnpio') c_mnpio: string
        ): Promise<PostalcodeDTO[]> {
        let colony = await this.postalcodeService.getColony(c_pais, c_state,c_mnpio)
        return res.status(HttpStatus.OK).json(colony)
    }
}
