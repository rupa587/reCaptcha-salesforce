public without sharing class UserRegistrationController {
    @AuraEnabled
    public static void registerUser(String firstName, String lastName, String email, String username, String alias, String communityNickname,String password, String recaptchaResponse) {
        /*if (!verifyRecaptcha(recaptchaResponse)) {
            throw new AuraHandledException('reCAPTCHA verification failed.');
        }
        Account objAcc = new Account(name ='Test Account');
        insert objAcc; */
        
        Contact objContact = new Contact(LastName =lastName ,Email = email ,AccountId = '001J4000002iWGhIAM');
        insert objContact; 
        User newUser = new User(
            FirstName = firstName,
            LastName = lastName,
            Email = email,
            Username = username,
            Alias = alias,
            CommunityNickname = communityNickname,
            TimeZoneSidKey = 'America/Los_Angeles',
            LocaleSidKey = 'en_US',
            EmailEncodingKey = 'UTF-8',
            LanguageLocaleKey = 'en_US',
            ProfileId = [SELECT Id FROM Profile WHERE Name = 'Custom Community User' LIMIT 1].Id,
            ContactId = objContact.Id
        );

        try {
            insert newUser;
            System.setPassword(newUser.Id,password);
           
        } catch (DmlException e) {
            throw new AuraHandledException('User registration failed: ' + e.getMessage());
        }
    }

   /* public static Boolean verifyRecaptcha(String recaptchaResponse) {
        String secretKey = '6Lcuu-kpAAAAAFhUdSzzMABbZ9nOj-6xJyKh98b_';
        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://www.google.com/recaptcha/api/siteverify');
        req.setMethod('POST');
        req.setBody('secret=' + secretKey + '&response=' + recaptchaResponse);

        Http http = new Http();
        HttpResponse res = http.send(req);

        if (res.getStatusCode() != 200) {
            return false;
        }

        Map<String, Object> responseMap = (Map<String, Object>) JSON.deserializeUntyped(res.getBody());
        return (Boolean) responseMap.get('success');
    }*/
}