import React from 'react'
import { useForm, useWatch } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useLoaderData } from 'react-router';
import { useMemo } from 'react';
import Swal from 'sweetalert2';

const Rider = () => {
  const {
    register,
    handleSubmit,
    control,
  } = useForm();

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const serviceCenters = useLoaderData() || [];

  const regions = useMemo(() => {
    const reginonsDuplicate = serviceCenters.map(c => c.region);
    return [...new Set(reginonsDuplicate)];
  }, [serviceCenters]);


  const riderRegion = useWatch({ control, name: 'region' });


  const districts = useMemo(() => {

    if (!riderRegion) return [];
    return serviceCenters
      .filter(c => c.region === riderRegion)
      .map(d => d.district);
  }, [riderRegion, serviceCenters]);

  const handleRiderApplication = data => {
    console.log(data);
    axiosSecure.post('/riders', data)
      .then(res => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your application has been submitted.",
            showConfirmButton: false,
            timer: 2000
          });
        }
      })
  };

  return (
    <div>
      <h2 className="text-2xl">Be a Rider</h2>
      <form onSubmit={handleSubmit(handleRiderApplication)} className='mt-12 p-4 text-black'>

        {/* two column */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
          {/* info */}
          <fieldset className="fieldset">
            <h4 className="text-2xl font-semibold"> Rider Details</h4>

            {/* name */}
            <label className="label">Rider Name</label>
            <input type="text" {...register('name')}
              defaultValue={user?.displayName}
              className="input w-full" placeholder="Sender Name" />

            {/* email */}
            <label className="label">Email</label>
            <input type="text" {...register('email')}
              defaultValue={user?.email}
              className="input w-full" placeholder="Email Name" />

            {/* region */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Regions</legend>
              <select {...register('region')} defaultValue="Pick a region" className="select">
                <option disabled={true}>Pick a region</option>
                {
                  regions.map((r, i) => <option key={i} value={r}>{r}</option>)
                }
              </select>
            </fieldset>

            {/* districts */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Districts</legend>
              <select {...register('districts')} defaultValue="Pick a Districts" className="select">
                <option disabled={true}>Pick a Districts</option>
                {
                  districts.map((r, i) => <option key={i} value={r}>{r}</option>)
                }
              </select>
            </fieldset>

            {/* address */}
            <label className="label mt-4">Your Address</label>
            <input type="text" {...register('address')} className="input w-full" placeholder="Sender Address" />

          </fieldset>

          {/* Details  */}
          <fieldset className="fieldset">
            <h4 className="text-2xl font-semibold"> More Details</h4>

            {/* license */}
            <label className="label">Driving License</label>
            <input type="text" {...register('license')} className="input w-full" placeholder="Driving License" />

            {/* NID*/}
            <label className="label">NID</label>
            <input type="text" {...register('nid')} className="input w-full" placeholder="NID" />

            {/* bick information */}
            <label className="label">BICK Information</label>
            <input type="text" {...register('bick')} className="input w-full" placeholder="Bick" />
          </fieldset>
        </div>
        <input type="submit" className='btn btn-primary mt-4 text-black' value="Apply as a Rider" />
      </form>
    </div>
  )
}

export default Rider;