import { FieldError, useForm } from "react-hook-form";
// import { DevTool } from "@hookform/devtools";
//remove this if issues are encountered
import { FieldErrors } from "react-hook-form";
import "./YoutubeForm.css";
import { useEffect } from "react";
// import { useEffect } from "react";

type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string;
    facebook: string;
  };
  phoneNumbers: string[];
  age: number;
  dob: Date;
};

const YouTubeForm = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      username: "",
      email: ".com",
      channel: "",
      social: {
        twitter: "",
        facebook: "",
      },
      phoneNumbers: ["", ""],
      age: 0,
      dob: new Date(),
    },
    mode:'onTouched',
  });
  const {
    register,
    control,
    handleSubmit,
    formState,
    watch,
    getValues,
    setValue,
    reset,
    trigger,
  } = form;
  const { errors, touchedFields, dirtyFields, isDirty, isValid ,isSubmitting,isSubmitSuccessful,isSubmitted} = formState;
  console.log(
    "the fields touched and dirty are",
    dirtyFields,
    touchedFields,
    isDirty
  );
  console.log("the three states are",{isSubmitting,isSubmitSuccessful,isSubmitted,})
  const onSubmit = (data: FormValues) => {
    // data is automatically accessed
    // event.preventDefault(); no need.
    console.log("the form data is ", data);
    console.log("form submitted")
  };
  const onError = (errors: FieldErrors<FormValues>) => {
    //errors are obtained automatically
    console.log("errors are", errors);
  };

  const watchUsername = watch("username");
  const watchUserArray = watch(["username", "email", "channel"]);

  const getValuesOfForm = () => {
    console.log("the values by using getValues are", getValues());
    console.log("the username is ", getValues("username"));
    console.log("array of data", getValues(["username", "email", "channel"]));
  };

  const setValuesOfForm = () => {
    // setValue('username','changed')
    setValue("username", "changed", {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  /*
// useEffect(()=>{
//   const subscription =  watch((value)=>{
//     console.log(value)
//   })
//   return ()=> subscription.unsubscribe();
// },[watch])

*/
useEffect(()=>{
  if(isSubmitSuccessful === true){
    reset()
  }

},[isSubmitSuccessful,reset])

  return (
    <>
      <h2>the name is {watchUsername}</h2>
      {/* <h2>the name is {watchUserArray}</h2> */}

      <form
        className="reacthookform"
        onSubmit={handleSubmit(onSubmit, onError)}
        noValidate
      >
        <h1>YouTube Form</h1>
        <label htmlFor="username">UserName</label>
        <input
          placeholder="your name"
          type="text"
          className="username"
          {...register("username", {
            required: { value: true, message: "enter valid username" },
          })}
        ></input>
        <p>{errors.username?.message}</p>

        <label htmlFor="email">Email</label>
        <input
          type="text"
          className="email"
          {...register("email", {
            pattern: {
              value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              message: "invalid email",
            },
            validate: {
              notAdmin: (fieldValue) => {
                //fieldValue is automatically provided
                return (
                  // you can use if else like below
                  fieldValue !== "admin@example.com" ||
                  "enter another email Address"
                );
              },
              notBlackListed: (fieldValue) => {
                //fieldValue is automatically provided

                if (fieldValue.endsWith("yahoo.com")) {
                  return "This domain @yahoo.com is not supported";
                } else {
                  return true; // No error
                }
              },
              emailAvailable:async (fieldValue)=> {
                //fieldValue is automatically provided

                const response = await fetch(`https://jsonplaceholder.typicode.com/users?email=${fieldValue}`)
                // https://jsonplaceholder.typicode.com/users?email=Sincere@april.biz
                // if user adds Sincere@april.biz ,then information is passed ie length will be greater than 0 ie already exists.
                const data = await response.json()
                return data.length == 0 || 'email already exists'
                
              }
            },
          })}
        ></input>
        <p>{errors.email?.message}</p>

        <label htmlFor="channel">Channel</label>
        <input
          type="text"
          className="channel"
          {...register("channel", { required: "enter valid data" })}
        ></input>
        <p>{errors.channel?.message}</p>

        <label htmlFor="twitter">twitter</label>
        <input
          type="text"
          className="twitter"
          {...register("social.twitter", { required: "enter valid data" })}
        ></input>
        <p>{errors.channel?.message}</p>

        <label htmlFor="facebook">facebook</label>
        <input
          type="text"
          className="facebook"
          {...register("social.facebook", { required: "enter valid data" })}
        ></input>
        <p>{errors.channel?.message}</p>

        <label htmlFor="phone-number"> Primary phone number</label>
        <input
          type="text"
          className="phone-number"
          {...register("phoneNumbers.0")}
          // cannot use phoneNumbers[0]
        ></input>

        <label htmlFor="phone-number"> Secondary phone number</label>
        <input
          type="text"
          className="phone-number"
          {...register("phoneNumbers.1")}
          // cannot use phoneNumbers[1]
        ></input>

        <label htmlFor="age"> Age</label>
        <input
          type="number"
          className="age"
          {...register("age", {
            valueAsNumber: true,
            // connditionally disabling the form input field.
            // disabled: watch("channel") === "",
            // if channel field is empty disable the age field
          })}
          // cannot use phoneNumbers[1]
        ></input>

        <label htmlFor="dob"> Date of Birth</label>
        <input
          type="date"
          className="age"
          {...register("dob", {
            valueAsDate: true,
            required: { value: true, message: "enter valid username" },
            // disabled: true,
          })}
        ></input>

        {/* <button type="submit" disabled={!isDirty || !isValid}>Submit</button> */}
        <button type="submit" disabled={!isDirty }>Submit</button>
        <button type="button" onClick={getValuesOfForm}>
          get values
        </button>
        <button type='button' onClick={()=>reset()}>Reset</button>
        <button type="button" onClick={setValuesOfForm}>
          setvalues
        </button>
        <button type='button' onClick={()=> trigger()}>Validate Manually</button>
        <button type='button' onClick={()=> trigger('channel')}>Validate Manually for channel</button>

      </form>
      
      {/* <DevTool control={control} /> */}
    </>
  );
};

export default YouTubeForm;

// notBlackListed: (fieldValue) => {
//   return (
//     !fieldValue.endsWith("yahoo.com") ||
//     "this domain @yahoo.com is not supported"
//   );
// },
