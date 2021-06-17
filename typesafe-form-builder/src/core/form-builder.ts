import { defaultEntity, Entities } from "./entities";
import { QueryFunction, queryable } from "./queryable";

/**
 * Type definition for the `FormBuilder`, the root object of the project.
 */
 interface FormBuilder<Spec> {
    readonly specification: Spec,
    entity: <EQ extends keyof Omit<Entities, keyof Spec>, OutputObject, OutputQuerried, 
        QF extends QueryFunction<Entities[EQ], {}, OutputObject, OutputQuerried>>
        (entity: EQ, q: QF, data?: Entities[EQ]) =>
        FormBuilder<Spec & Record<EQ, ReturnType<QF>["querried"][]>>
}

/**
 * Type definition for the `FormBuilder`, the root object of the project.
 * 
 * @param specification The specification the build step shoud be initialized with. 
 * @returns A new `FormBuilderStep` instance.
 */
const FormBuilderStep = <Spec>(specification: Spec) : FormBuilder<Spec> => ({
    specification: specification,
    entity: (entity, q, data=defaultEntity(entity)) =>  FormBuilderStep({
            ...specification,
            ...{ [entity]: [q(queryable(data)).querried]
                } as Record<typeof entity, ReturnType<typeof q>["querried"][]>
        })
})

/**
 * `FormBuilder` instance, creating a new and empty FormBuilder, ready to use.
 * 
 * @returns A new `FormBuilder` instance.
 */
 export const FormBuilder = (() => FormBuilderStep({}))()

