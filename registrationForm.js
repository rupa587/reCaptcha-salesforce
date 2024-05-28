import { LightningElement, track } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import registerUser from '@salesforce/apex/UserRegistrationController.registerUser';
//import RECAPTCHA_SITE_KEY from '@salesforce/label/c.RecaptchaSiteKey';

export default class RegistrationForm extends LightningElement {
    @track firstName = '';
    @track lastName = '';
    @track email = '';
    @track username = '';
    @track alias = '';
    @track communityNickname = '';
    @track password = '';
    //@track confirmPassword = '';
    @track showMessage=false;
    @track vrfyCaptcha=false;

    recaptchaLoaded = false;

    handleInputChange(event) {
        const field = event.target.dataset.id;
        this[field] = event.target.value;
    }

    

    connectedCallback() 
    {
        document.addEventListener("grecaptchaVerified", (e) => {
          if(e.detail.response!=null)
            {
                this.showMessage=false;
                this.handleButton();
            }
        });   
    }

    handleButton() 
    {
       this.vrfyCaptcha=true;
    }

    renderedCallback() 
    {
        var divElement = this.template.querySelector('div.recaptchaInvisible');
        var payload = {element: divElement, badge: 'bottomright'};
        document.dispatchEvent(new CustomEvent("grecaptchaRender", {"detail": payload})); 
    }

    handleRegister() {
        /*if (this.password !== this.confirmPassword) {
            alert('Passwords do not match.');
            return;
        }*/
        if(this.vrfyCaptcha==false)
            {
                this.showMessage=true;     
            }
            
           

        /*const recaptchaResponse = window.grecaptcha.getResponse();

        if (!recaptchaResponse) {
            alert('Please complete the reCAPTCHA');
            return;
        }*/
        console.log('68');
        registerUser({
            
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            username: this.username,
            alias: this.alias,
            communityNickname: this.communityNickname,
            password: this.password,
            //recaptchaResponse: recaptchaResponse
        }).then(() => {
            window.location.href = '/login';
            
            alert('Google Recatcha Verification Completed');
        }).catch(error => {
            console.error('Error:', error);
            
            alert('Registration failed. Please try again.');
        });
    }
}