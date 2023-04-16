import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Postalcode } from './interfaces/postalcode.interface'
import { PostalcodeDTO } from './dto/postalcode.dto'

@Injectable()
export class PostalcodeService {

    constructor(@InjectModel('postalcode') private readonly postalcodeModel: Model<Postalcode>) {

    }

    async createProduct(createProductDTO: PostalcodeDTO): Promise<Postalcode> {
        const newProduct = new this.postalcodeModel(createProductDTO);
        return newProduct.save();
    }

    async getStates(c_pais: string): Promise<Postalcode[]> {
        let states = await this.postalcodeModel.aggregate([{
            $group: {
                _id: {
                    c_estado: '$c_estado',
                    d_estado: '$d_estado'
                }
            }
        }])
        states = states.map(f => {
            return f._id
        })
        return states
    }

    async getMunicipaly(c_pais: string, c_state: string): Promise<Postalcode[]> {
        let municipaly = await this.postalcodeModel.aggregate([
            {
                $match: { 'c_estado': c_state }
            },
            {
                $group: {
                    _id: {
                        c_mnpio: '$c_mnpio',
                        D_mnpio: '$D_mnpio'
                    }
                }
            }
        ])
        municipaly = municipaly.map(f => {
            return f._id
        })
        return municipaly
    }

    async getColony(c_pais: string, c_state: string, c_mnpio : string): Promise<Postalcode[]> {
        let colony = await this.postalcodeModel.find(
                { c_estado: c_state , c_mnpio:c_mnpio},
                {
                    _id:0,
                    d_asenta:1,
                    id_asenta_cpcons:1,
                    d_codigo:1
                }
            )
        return colony
    }

}
