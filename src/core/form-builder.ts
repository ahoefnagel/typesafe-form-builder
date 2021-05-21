import { IsEqual, Listify } from "../utilities/helper-types";
import { defaultEntity, Entities } from "./entities";
import { Queryable, QueryFunction, queryable } from "./queryable";


/**
 * Type definition for the `FormBuilder`, the root object of the project.
 */
interface FormBuilder<Spec extends Listify<Partial<Entities>>> {
    readonly specification: Listify<Partial<Entities>>,//Partial<Entities>,
    entity: <EQ extends keyof Entities>(entity: EQ, 
        q: QueryFunction<Entities[EQ], Partial<Entities[EQ]>, Partial<Entities[EQ]>, Partial<Entities[EQ]> >) =>
        FormBuilder<Spec>
}

/**
 * Type definition for the `FormBuilder`, the root object of the project.
 * 
 * @param specification The specification the build step shoud be initialized with. 
 * @returns A new `FormBuilderStep` instance.
 */
 const FormBuilderStep = <Spec extends Listify<Partial<Entities>>>(specification: Spec) : FormBuilder<Spec> => ({
        specification: specification,        
        entity: (entity, q) =>  FormBuilderStep({...specification, ...{[entity]: [q(queryable(defaultEntity(entity))).querried]} })
    })

/**
 * `FormBuilder` instance, creating a new and empty FormBuilder, ready to use.
 * 
 * @returns A new `FormBuilder` instance.
 */
 export const FormBuilder = (() => FormBuilderStep({}))()

