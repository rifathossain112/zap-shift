import React, { useMemo } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const SendParcel = () => {
    
   
    const { register, handleSubmit, control } = useForm();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const serviceCenters = useLoaderData() || [];
    const navigate = useNavigate();

   
    const reginonName = useMemo(() => {
        const reginonsDuplicate = serviceCenters.map(c => c.region);
        return [...new Set(reginonsDuplicate)];
    }, [serviceCenters]);

    const senderRegion = useWatch({ control, name: 'senderRegion' });
    const reciverRegion = useWatch({ control, name: 'reciverRegion' });

    
    const senderDistrictsList = useMemo(() => {
        if (!senderRegion) return [];
        return serviceCenters.filter(c => c.region === senderRegion).map(d => d.district);
    }, [senderRegion, serviceCenters]);

    const reciverDistrictsList = useMemo(() => {
        if (!reciverRegion) return [];
        return serviceCenters.filter(c => c.region === reciverRegion).map(d => d.district);
    }, [reciverRegion, serviceCenters]);

    const handleSendParcel = data => {
        console.log(data)

        const isDocument = data.parcelType === 'document'
        const isSameDistrict = data.senderDistricts === data.reciverDistricts;
        const parcelWeight = parseFloat(data.parcelWeight) || 0;

        let cost = 0;
        if (isDocument) {
            cost = isSameDistrict ? 60 : 80;
        }
        else {
            if (parcelWeight < 3) {
                cost = isSameDistrict ? 110 : 150;
            } else {
                const minCharge = isSameDistrict ? 110 : 150;
                const extraWeight = parcelWeight - 3;
                const extraCharge = isSameDistrict ? extraWeight * 40 : extraWeight * 40 + 40;
                cost = minCharge + extraCharge;
            }
        }
        
        console.log('cost', cost);
        data.cost = cost;
        
        Swal.fire({
            title: "Agree with the cost?",
            text: `You will be charged ${cost} taka`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm and Continue Payment!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.post('/parcels', data)
                    .then(res => {
                        console.log('after saving parcel', res.data)
                        if (res.data.insertedId) {
                            navigate('/dashboard/my-parcels')
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Parcel has created. Please Pay",
                                showConfirmButton: false,
                                timer: 2500
                            });
                        }
                    })
            }
        });
    }

    return (
        <div>
            <h2 className="text-5xl font-bold">Send A Parcel</h2>
            <form onSubmit={handleSubmit(handleSendParcel)} className='mt-12 p-4 text-black'>
                {/* parcel type */}
                <div>
                    <label className="label mr-4">
                        <input type="radio" {...register('parcelType')} value="document" className="radio" defaultChecked />
                        Document
                    </label>
                    <label className="label">
                        <input type="radio" {...register('parcelType')} value="non-document" className="radio" />
                        Non-Document
                    </label>
                </div>

                {/* parcel info: name, weight */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12 my-8'>
                    <fieldset className="fieldset">
                        <label className="label">Parcel Name</label>
                        <input type="text" {...register('parcelName')} className="input w-full" placeholder="Parcel Name" />
                    </fieldset>
                    <fieldset className="fieldset">
                        <label className="label">Parcel Weight (kg)</label>
                        <input type="number" step="any" {...register('parcelWeight')} className="input w-full" placeholder="Parcel Weight" />
                    </fieldset>
                </div>

                {/* two column */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
                    {/* sender info */}
                    <fieldset className="fieldset">
                        <h4 className="text-2xl font-semibold"> Sender Details</h4>
                        
                        <label className="label">Sender Name</label>
                        <input type="text" {...register('senderName')}
                            defaultValue={user?.displayName}
                            className="input w-full" placeholder="Sender Name" />
                        
                        <label className="label">Sender Email</label>
                        <input type="text" {...register('senderEmail')}
                            defaultValue={user?.email}
                            className="input w-full" placeholder="Email Name" />
                        
                        {/* sender region */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Sender Regions</legend>
                            <select {...register('senderRegion')} defaultValue="Pick a region" className="select">
                                <option disabled={true}>Pick a region</option>
                                {
                                    reginonName.map((r, i) => <option key={i} value={r}>{r}</option>)
                                }
                            </select>
                        </fieldset>

                        {/* sender districts */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Sender Districts</legend>
                            <select {...register('senderDistricts')} defaultValue="Pick a Districts" className="select">
                                <option disabled={true}>Pick a Districts</option>
                                {
                                    senderDistrictsList.map((r, i) => <option key={i} value={r}>{r}</option>)
                                }
                            </select>
                        </fieldset>

                        <label className="label mt-4">Sender Address</label>
                        <input type="text" {...register('senderAddress')} className="input w-full" placeholder="Sender Address" />
                        
                        <label className="label mt-4">Phone Number</label>
                        <input type="number" {...register('senderNumber')} className="input w-full" placeholder="Sender Number" />

                        <label className="label mt-4">Pick up Instruction</label>
                        <input type="text" {...register('senderInstruction')} className="input w-full" placeholder="Pick up Instruction" />
                    </fieldset>

                    {/* receiver Details */}
                    <fieldset className="fieldset">
                        <h4 className="text-2xl font-semibold"> Receiver Details</h4>
                        
                        <label className="label">Receiver Name</label>
                        <input type="text" {...register('receiverName')} className="input w-full" placeholder="Receiver Name" />

                         <label className="label">Receiver Email</label>
                        <input type="text" {...register('receiverEmail')} className="input w-full" placeholder="Receiver Email" />
                        
                        {/* receiver region */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Reciver Regions</legend>
                            <select {...register('reciverRegion')} defaultValue="Pick a region" className="select">
                                <option disabled={true}>Pick a region</option>
                                {
                                    reginonName.map((r, i) => <option key={i} value={r}>{r}</option>)
                                }
                            </select>
                        </fieldset>

                        {/* receiver districts */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Reciver Districts</legend>
                            <select {...register('reciverDistricts')} defaultValue="Pick a Districts" className="select">
                                <option disabled={true}>Pick a Districts</option>
                                {
                                    reciverDistrictsList.map((r, i) => <option key={i} value={r}>{r}</option>)
                                }
                            </select>
                        </fieldset>

                        <label className="label mt-4">Receiver Address</label>
                        <input type="text" {...register('receiverAddress')} className="input w-full" placeholder="Receiver Address" />
                        
                        <label className="label mt-4">Phone Number</label>
                        <input type="number" {...register('receiverNumber')} className="input w-full" placeholder="Receiver Number" />

                        <label className="label mt-4">Delivery instruction</label>
                        <input type="text" {...register('receiverInstruction')} className="input w-full" placeholder="Delivery instruction" />
                    </fieldset>
                </div>
                <input type="submit" className='btn btn-primary mt-4 text-black' value="Send Parcel" />
            </form>
        </div>
    )
}

export default SendParcel;