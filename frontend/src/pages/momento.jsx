
function RegisterPage() {
    const { register, handleSubmit } = useForm();
    const { signup, isAuthenticated  } = useAuth()
    const navigate = useNavigate()
  
    useEffect(()=>{
      if(isAuthenticated) navigate("/posts"); 
    },[isAuthenticated]);
  
    console.log(user)
    const onSubmit = handleSubmit(async (values) => {
      signup(values);
  
    });