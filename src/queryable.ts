import { omitProps, pickProps } from "./object-utilities";

export type Queryable<InputObject, Querried> = {
    entity: InputObject,
    querried: Querried,
    select: <Props extends PrimitiveProps<InputObject>[]>(...props: Props) => Queryable<Omit<InputObject, typeof props[number]>, Querried & Pick<InputObject, typeof props[number]>>
}

export const queryable = <InputObject, Querried>(object: InputObject, querried: Querried) : Queryable<InputObject, Querried> => {
    return {
        entity: object,
        querried: querried,
        select: (...props) => queryable(
            omitProps(object, ...props), 
            {...querried , ...pickProps(object, ...props)}
        )
    }
}
