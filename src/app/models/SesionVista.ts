export class SesionVista {
    sesion_id: number
    sesion_caso: string;
    sesion_no: string;
    sesion_terapeuta: number;
    sesion_coterapeuta: number;
    sesion_objetivo: string;
    sesion_rev_tarea: number;
    sesion_tecnica_abc: string;

    sesion_evento_act : string;
    sesion_pensamientos_cre : string;
    sesion_consecuencia_emo : string;
  
    sesion_obj_emo : string;
    sesion_obj_cond : string;
    sesion_obj_prac : string;
  
    sesion_preguntas_debate : string;
    sesion_tecnicas_estrategias : string;
  
    sesion_abc_tareas  : string;
    
    sesion_otras_tecnicas: string;
    sesion_tarea_asignada: string;
    sesion_notas_ad: string;
    sesion_recomendacion_sup: string;
    sesion_fecha_captura: Date;
    sesion_fecha_modificacion: Date;
    sesion_paciente_id: number;
    terapeuta: string;
    coterapeuta: string;
    rev_tarea_desc: string;
    sesion_impedimiento:string;
}