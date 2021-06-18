import { defaultEntity, Entities } from "./entities";
import { QueryFunction, queryable } from "./queryable";

/**
 * Type definition for the `FormBuilder`, the root object of the project.
 */
 interface FormBuilder<Spec> {
    readonly specification: Spec,

    /**
     * @param entity name of the entity to be queried.
     * Entities are defined in the `Entities` interface in `Entities.ts`.
     * @param q querry function to perform query operations on the specified entity.
     * @param data optional data object of the given `entity`.
     * If no data is provided a new object is created using the `defaultEntity` function.
     * @returns a new `FormBuilder` instance with the given `entity` added to the `specification`.
     * 
     * Example usage:
     * ```
     * FormBuilder.entity("Student", 
     * q => q.select("name", "surname").children("grades", 
     * q => q.select("grade").child("course", 
     * q => q.select("name"))))
     * ```
     */
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

