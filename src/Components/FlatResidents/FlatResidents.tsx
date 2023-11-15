import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import styles from "./FlatResidents.module.css"
import {FlatType} from "api/types";
import ResidentCard from "Components/ResidentCard/ResidentCard";
import {useAddClientMutation, useBindClientMutation, useGetClientsByAddressIdQuery} from "api/api";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {schema} from "utils/resolvers/resolver";

const FlatResidents = () => {
    const location = useLocation();
    const navigate=useNavigate()
    const [searchParams] = useSearchParams()
    const addressId = searchParams.get('addressId') as string
    const flat: FlatType = location.state

    const {data: clients} = useGetClientsByAddressIdQuery(+addressId)
    const [addClient, {isLoading: isAdding}] = useAddClientMutation()
    const [bindClient] = useBindClientMutation()

    const {register, handleSubmit, formState: {errors}, reset} = useForm({
        resolver: yupResolver(schema)
    });

    const handleAddResident = async (formData: { name: string; phone: string; email: string; }) => {
        try {
            const newResident = await addClient({
                name: formData.name,
                phone: formData.phone,
                email: formData.email
            }).unwrap();
            await bindClient({addressId: flat.addressId, clientId: newResident.id}).unwrap();
            reset()
        } catch (error) {
            console.error('Ошибка при добавлении жильца:', error);
        }
    };


    return (
        <div className={styles.container}>
            <div className={styles.flatInfo}>
                {`Детальная информация по адресу: ${flat.streetName} ${flat.houseId}, квартира № ${flat.flat}`}
            </div>
            <div style={{display:"flex",justifyContent:"space-between"}}>
                <form className={styles.form} onSubmit={handleSubmit(handleAddResident)}>
                    <div>Форма добавления нового жильца</div>
                    <input {...register("name")} type="text" placeholder="Имя жильца"/>
                    <p className={styles.error}>{errors.name?.message}</p>

                    <input {...register("phone")} type="tel" placeholder="Телефон жильца"/>
                    <p className={styles.error}>{errors.phone?.message}</p>

                    <input {...register("email")} type="email" placeholder="Email жильца"/>
                    <p className={styles.error}>{errors.email?.message}</p>

                    <button type="submit" disabled={isAdding}>
                        {isAdding ? 'Добавление...' : 'Добавить жильца'}
                    </button>
                </form>
                <button className={styles.backBtn} onClick={()=>navigate('/')}>Вернуться назад</button>
            </div>

            {clients && clients.length > 0 ? (
                <div className={styles.cards}>
                    {clients.map((resident) => (
                        <ResidentCard key={resident.id} resident={resident} addressId={+addressId}/>
                    ))}
                </div>
            ) : (
                <div>В этой квартире пока нет жильцов.</div>
            )}
        </div>
    );
};

export default FlatResidents;