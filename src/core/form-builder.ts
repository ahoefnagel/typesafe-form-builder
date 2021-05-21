import { IsEqual, Listify } from "../utilities/helper-types";
import { defaultEntity, Entities } from "./entities";
import { Queryable, QueryFunction, queryable } from "./queryable";

interface FormBuilder<Spec extends Listify<Partial<Entities>>> {
    readonly specification: Listify<Partial<Entities>>,//Partial<Entities>,
    entity: <EQ extends keyof Entities>(entity: EQ, 
        q: QueryFunction<Entities[EQ], {}, Partial<Entities[EQ]>, Partial<Entities[EQ]> >) =>
        FormBuilder<Spec>
}

// FormBuilder constructor
const FormBuilderStep = <Spec extends Listify<Partial<Entities>>>(specification: Spec) : FormBuilder<Spec> => ({
        specification: specification,        
        entity: (entity, q) =>  FormBuilderStep({...specification, ...{[entity]: [q(queryable(defaultEntity(entity))).querried]} })
    })

export const FormBuilder = (() => FormBuilderStep({}))()

