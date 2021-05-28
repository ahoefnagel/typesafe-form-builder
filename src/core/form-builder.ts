import { Listify } from "../utilities/helper-types";
import { defaultEntity, Entities } from "./entities";
import { QueryFunction, queryable } from "./queryable";


/**
 * Type definition for the `FormBuilder`, the root object of the project.
 */
interface FormBuilder<Spec extends Partial<Listify<Entities>>> {
    readonly specification: Spec,//Partial<Entities>,
    entity: <EQ extends keyof Entities>(entity: EQ, 
        q: QueryFunction<Entities[EQ], Partial<Entities[EQ]>, Partial<Entities[EQ]>, Spec[EQ] >) =>
        FormBuilder<Spec>
}

/**
 * Type definition for the `FormBuilder`, the root object of the project.
 * 
 * @param specification The specification the build step shoud be initialized with. 
 * @returns A new `FormBuilderStep` instance.
 */
 const FormBuilderStep = <Spec extends Partial<Listify<Entities>>>(specification: Spec) : FormBuilder<Spec> => ({
        specification: specification,
        // entity: (entity, q) =>  FormBuilderStep({...specification, ...{[entity]: [q(queryable(defaultEntity(entity))).querried]} })
        entity: (entity, q) => FormBuilderStep( {
                ...specification,
                ...{[entity]: [q(queryable(defaultEntity(entity))).querried].concat(specification[entity] != undefined ? specification[entity] : []) } } as Spec)
        });

/**
 * `FormBuilder` instance, creating a new and empty FormBuilder, ready to use.
 * 
 * @returns A new `FormBuilder` instance.
 */
 export const FormBuilder = (() => FormBuilderStep({}))()

