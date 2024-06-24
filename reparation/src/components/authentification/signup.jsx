import React, { useState, useEffect } from "react";
import k from '../../assets/img/register/register.jpg';
import google from '../../assets/img/register/register.jpg';
import axios from 'axios';
import * as yup from 'yup';
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";


const Signup = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [errorMessage, setErrorMessage] = useState('');
    const [showEmailPopup, setShowEmailPopup] = useState(false);
    const [showTelPopup, setShowTelPopup] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [mdp, setMdp] = useState('');
    const [confmdp, setConfmdp] = useState('');
    const [tel, setTel] = useState('');
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState({});
    const [matchesError, setMatchesError] = useState('');
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);



    const handleCloseSuccessPopup = () => {
        setShowSuccessPopup(false);
        window.location.href = '/Signin'; // Redirect to sign-in page
    };



    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);





    const validationSchema = yup.object().shape({
        nom: yup.string().min(3, 'Le nom doit contenir au moins 3 caractères.').matches(/^[A-Za-z]{3,}[A-Za-z\s]*$/, 'Le nom ne doit contenir que des lettres.').required('Veuillez entrer votre nom.'),
        prenom: yup.string().matches(/^[A-Za-z]{3,}[A-Za-z\s]*$/, 'Le prenom doit contenir au moins 3 caractères.').matches(/^[A-Za-z\s]*$/, 'Le prénom ne doit contenir que des lettres.').required('Veuillez entrer votre prénom.'),       
        mdp: yup.string().min(4, 'Le mot de passe doit contenir au moins 4 caractères.').required('Veuillez entrer votre mot de passe.'),
        tel: yup.string().matches(/^\d{8}$/, 'Le numéro de téléphone doit contenir 8 chiffres.').required('Veuillez entrer votre numéro de téléphone.'),
        email: yup.string().email('Adresse email invalide.').required('Veuillez entrer votre email.'),

    });

    console.log(errors.confmdp);

    const validateField = async (field, value) => {
        try {
            await validationSchema.validateAt(field, { [field]: value });
            setErrors({ ...errors, [field]: null });
        } catch (error) {
            setErrors({ ...errors, [field]: error.message });
        }
    };


    

    const convertBase64 = (image) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(image);
    
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
    
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    
const handleImageChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = await convertBase64(e.target.files[0]);
      setImage(img);
    }
  };

    






    const handleSubmit = async (e) => {
        e.preventDefault();
        if (mdp !== confmdp) {
            setMatchesError('Les mots de passe doivent correspondre.');
        } else {
            setMatchesError('');
            // handle form submission

            setErrorMessage('');
            try {
                await validationSchema.validate({ nom, prenom, email, tel, mdp, confmdp });
                const response = await axios.post('http://localhost:3001/auth/register', { nom, prenom, email, tel, mdp , image});
                console.log('Réponse du serveur:', response.data);
                setShowSuccessPopup(true);



            } catch (error) {
                console.error('Erreur lors de l\'inscription :', error);
                // Handle errors
                if (error instanceof yup.ValidationError) {
                    setErrorMessage('Données invalides fournies.');
                    const errors = error.inner.reduce((acc, curr) => ({ ...acc, [curr.path]: curr.message }), {});
                    setErrors(errors);
                } else {
                    // Display a generic error message
                    setErrorMessage('Une erreur s\'est produite. Veuillez réessayer plus tard.');
                    if (error.response && error.response.data.error === 'Email address is already in use') {
                        setShowEmailPopup(true); // Afficher la popup pour l'email
                    } else if (error.response && error.response.data.error === 'Phone number is already in use') {
                        setShowTelPopup(true); // Afficher la popup pour le numéro de téléphone
                    } else if (error.response && error.response.status === 500) {
                        window.location.href = '/error500';
                    }
                }
            }
        }
    };

    return (

        <div className="relative">
            {showEmailPopup && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg">
                        <h2 className="text-red-500 text-lg font-bold mb-4">Erreur d'inscription</h2>
                        <p>Une erreur s'est produite. email déjà utilisé</p>
                        <button onClick={() => setShowEmailPopup(false)} className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md">Fermer</button>
                    </div>
                </div>
            )}
            {showTelPopup && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg">
                        <h2 className="text-red-500 text-lg font-bold mb-4">Erreur d'inscription</h2>
                        <p>Une erreur s'est produite. Le numéro de téléphone déjà été utilisé</p>
                        <button onClick={() => setShowTelPopup(false)} className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md">Fermer</button>
                    </div>
                </div>
            )}
            {showSuccessPopup && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg">
                        <h2 className="text-green-500 text-lg font-bold mb-4">Inscription réussie</h2>
                        <p>Votre inscription a été réussie avec succès.</p>
                        <button onClick={handleCloseSuccessPopup} className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md">Fermer</button>
                    </div>
                </div>
            )}


            {windowWidth <= 960 ? null : (
                <img className="w-1/3 h-svh fixed top-0 right-0 mr-4" src={k} alt="" style={{ margin: 0 }} />
            )}
            <div className={windowWidth <= 960 ? "w-full text-3xl bg-blue-gray-900 pl-10 pt-10 flex-col justify-center items-center mt-8 relative " : "w-1/2 text-3xl right 1/2 bg-blue-gray-900 pl-40 pt-10 flex-col justify-center items-center mt-8 relative "}>
                <h1 className="mb-2 text-gray-700 mx-6"><b>Créer un compte</b></h1>
                <div className="absolute top-20 flex items-center mt-1 mx-6">
                    <h2 className="text-sm mt-1 font-thin bg-blue-gray-900 text-gray-700 " >Vous avez déjà un compte ?</h2>
                    <a href="Signin" className="ml-3 text-sm mt-1 bg-blue-gray-900 font-bold hover:underline text-gray-700  " >Se connecter</a>
                </div>

             <button className="w-[5rem] h-20 border-2 border-gray-700 rounded-full bg-white transition-transform duration-500 ease-in-out ml-[29rem] relative" onClick={() => document.getElementById('fileInput').click()}>
    <div className="text-gray-700 text-center text-xs font-semibold">ajouter une photo</div>                                                                                        
    <input id="fileInput" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
    {image && <img src={image} alt="Selected" className="w-20 h-20 rounded-full absolute top-0 left-0" />}
</button>
              
                {/* Formulaire */}
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col mt-2 mx-7">
                        <div className="flex mb-4">
                            <input type="text" placeholder="Nom" className={`w-3/5 mr-2 h-10 px-4 border ${errors.nom ? 'border-red-500 bg-rose-100' : 'border-gray-300'} focus:outline-none focus:border-gray-500 text-sm mt-2`} value={nom} onChange={(e) => { setNom(e.target.value); validateField('nom', e.target.value); }} required />
                            {errors.nom && <div className="text-red-500 text-xs mt-1">{errors.nom}</div>}
                            <input type="text" placeholder="Prénom" className={`w-3/5 h-10 px-4 border ${errors.prenom ? 'border-red-500 bg-rose-100' : 'border-gray-300'} focus:outline-none focus:border-gray-500 text-sm mt-2`} value={prenom} onChange={(e) => { setPrenom(e.target.value); validateField('prenom', e.target.value); }} required />
                            {errors.prenom && <div className="text-red-500  ml-2 text-xs mt-1">{errors.prenom}</div>}
                        </div>



                        <input type="email" placeholder="Email" className={`w-full mb-4 h-10 mr-2 px-4 border ${errors.email ? 'border-red-500 bg-rose-100' : 'border-gray-300'} focus:outline-none focus:border-gray-500 text-sm mt-2`} value={email} onChange={(e) => { setEmail(e.target.value); validateField('email', e.target.value); }} required />
                        {errors.email && <div className="text-red-500 text-xs mt-[-0.75rem]">{errors.email}</div>}
                        <input type="tel" placeholder="Numéro de téléphone" className={`w-full mb-4 h-10 px-4 border ${errors.tel ? 'border-red-500 bg-rose-100' : 'border-gray-300'} focus:outline-none focus:border-gray-500 text-sm mt-2`} value={tel} onChange={(e) => { setTel(e.target.value); validateField('tel', e.target.value); }} required />
                        {errors.tel && <div className="text-red-500 text-xs mt-[-0.75rem]">{errors.tel}</div>}
                        <div className="relative">
                        <input type={ visible?"text":"password" }placeholder="Mot de passe" className={`w-full mb-4  h-10 px-4 border ${errors.mdp ? 'border-red-500 bg-rose-100' : 'border-gray-300'} focus:outline-none focus:border-gray-500 text-sm mt-2 `} value={mdp} onChange={(e) => { setMdp(e.target.value); validateField('mdp', e.target.value); }} required />
                        <div className="absolute right-3 top-1/2  transform -translate-y-1/2 text-gray-600 cursor-pointer" onClick={()=> setVisible(!visible)}>
        {visible ? <IoEyeSharp className="size-4"/> : <FaEyeSlash className="size-4" />}
    </div></div>
                        {errors.mdp && <div className="text-red-500 text-xs mt-[-0.75rem]">{errors.mdp}</div>}
                       
     
                        <div className="relative">
                        <input type={visible2?"text":"password" }placeholder="Confirmer le mot de passe" className={`w-full mb-4 h-10 px-4 border ${matchesError ? 'border-red-500 bg-rose-100' : 'border-gray-300'} focus:outline-none focus:border-gray-500 text-sm mt-2`} value={confmdp} onChange={(e) => { setConfmdp(e.target.value); validateField('confmdp', e.target.value); }} required />
                        <div className="absolute right-3 top-1/2  transform -translate-y-1/2 text-gray-600 cursor-pointer" onClick={()=> setVisible2(!visible2)}>
        {visible2 ? <IoEyeSharp className="size-4" /> : <FaEyeSlash className="size-4" />}
    </div></div>
                        {errors.confmdp && <div className="text-red-500 text-xs mt-[-0.75rem]">{matchesError}</div>}
                    
                     
                     
                      {/*   <input type="file" accept="image/*" onChange={handleImageChange} className={`w-3/6 mb-4 h-10 px-4 border pt-2 -mt-2  focus:outline-none focus:border-gray-500 text-sm `} />
                        {image && <img src={image} alt="Selected" className="w-20 h-20 ml-[24rem] -mt-24 " />}
                        */}


                        <button type="submit" className="bg-gray-700 text-white px-4 py-3 rounded-full font-bold hover:bg-gray-800 text-sm flex items-center justify-center mt-4">Créer un compte</button>

                        {/* Lignes d'encadrement */}
                        <div className="flex items-center mt-4">
                            <hr className="w-full border-gray-500 flex-grow mr-2" />
                            <div className="text-lg" style={{ color: "#2C3E50" }}>ou</div>
                            <hr className="w-full border-gray-500 flex-grow ml-2" />
                        </div>

                        {/* Bouton Se connecter avec Google */}
                        <button className="bg-white-800 text-black px-4 py-3 font-medium font-bold text-sm flex items-center justify-center mt-4 border border-gray-800 mt-4">
                            <img src={google} alt="Google Icon" className="h-6 w-6 mr-2" />Se connecter avec Google
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
