import { Schema } from "mongoose";

export const PostalcodeSchema = new Schema({
    d_codigo: String,
    d_asenta: String,
    d_tipo_asenta: String,
    D_mnpio: String,
    d_estado: String,
    d_ciudad: String,
    d_CP: String,
    c_estado: String,
    c_oficina: String,
    c_CP: String,
    c_tipo_asenta: String,
    c_mnpio: String,
    id_asenta_cpcons: String,
    d_zona: String,
    c_cve_ciudad: String
})

