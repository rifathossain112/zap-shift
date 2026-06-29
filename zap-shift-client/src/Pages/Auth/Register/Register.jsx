import React from 'react'
import { useForm } from 'react-hook-form'
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocilaLogin from '../SocialLogin/SocilaLogin';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import axios from 'axios';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { registerUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  

  const handleRegistration = async (data) => {
  console.log(data.photo[0]);
  const profileImg = data.photo[0];

  try {
    
    const result = await registerUser(data.email, data.password);
    console.log("Firebase user created:", result.user);

    let photoURL = "";

   
    try {
      const formData = new FormData();
      formData.append('image', profileImg);
      const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Image_Api_key}`;
      
      const imgRes = await axios.post(image_API_URL, formData);
      photoURL = imgRes.data.data.url;
      console.log("Image uploaded successfully:", photoURL);
    } catch (imgError) {
      console.error("ImgBB Upload Failed, using default avatar:", imgError);
      photoURL = "https://www.w3schools.com/howto/img_avatar.png"; 
    }

   
    await updateUserProfile({
      displayName: data.name,
      photoURL: photoURL
    });
    console.log('Firebase Profile updated');

    
    const userInfo = {
      email: data.email,
      displayName: data.name,
      photoURL: photoURL,
    };
    
    await axiosSecure.post('/users', userInfo);
    console.log('User saved in database');

    navigate(location?.state || '/', { replace: true });

  } catch (error) {
    console.error("Registration Process Error:", error);
    if (error.code === 'auth/email-already-in-use') {
      alert('এই ইমেইলটি অলরেডি ব্যবহার করা হয়েছে!');
    } else {
      alert('রেজিস্ট্রেশন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।');
    }
  }
};
  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
      <h3 className="text-3xl text-center">Welcome to Zap Shift</h3>
      <p className='text-center'>Creat a account</p>
      <form className="card-body" onSubmit={handleSubmit(handleRegistration)}>
        {/* //daisy ui layout hero */}
        <fieldset className="fieldset">
          {/* name field */}
          <label className="label">Name</label>
          
          <input type="name" {...register('name', { required: true })} className="input" placeholder="Your Name" />
          {
            errors.email?.type === 'required' &&
            <p className='text-red-500'> Name is required.</p>
          }
          {/* photo image field */}
          <label className="label">Photo</label>
          <input type="file" {...register('photo', { required: true })} className="file-input" placeholder="Your Photo" />
          {
            errors.email?.type === 'required' &&
            <p className='text-red-500'> Photo is required.</p>
          }
          {/* email field */}
          <label className="label">Email</label>
          
          <input type="email" {...register('email', { required: true })} className="input" placeholder="Email" />
          {
            errors.email?.type === 'required' &&
            <p className='text-red-500'> Email is required.</p>
          }
          <label className="label">Password</label>

          {/* //password */}
          <input type="password" {...register('password', {
            required: true,
            minLength: 6,
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          })} className="input" placeholder="Password" />
          {
            errors.password?.type === 'required' && <p className='text-red-500'>Password is required.</p>
          }
          {
            errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be 6 characters or longer</p>
          }
          {
            errors.password?.type === 'pattern' && <p className='text-red-500'>Password must have at least one uppercase, at least one lowercase, at least one number and at least one special characters.</p>
          }
          <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn btn-neutral mt-4">Register</button>
        </fieldset>
        <p>
          Already have account?
          state={location.state}
          <Link className='text-blue-400 underline' to="/login">
            Login
          </Link>
        </p>
      </form>
      <SocilaLogin></SocilaLogin>
    </div>
  )
}

export default Register