# Designing Additional Features

> How could we implement a feature to accept emoji "reactions" from users? Let's define a "reaction" as an emoji that is a direct response to an existing message. What changes would be involved to accomodate this feature?

In the process when he clicks the emoji button we can show him a input box asking him to suggest the reaction if given we will add 
this to the JSON. later if we he wants to use the reaction he can use with "_" as an identifier.

> How could the user add new emojis to the application's list? What changes would be involved in adding support for custom emojis?

While searching for the emoji if the length is zero as you have seen I have used a ternary instead I would give him a input box with a 
add button at the end where he can give the emoji and I will rewrite the JSON.
Changes to be made are adding an input and add button with a function addCustomEmoji() with JSON rewrite code in the backend at express/node

> What changes would be required to list a user's most commonly used emojis as soon as the colon (:) symbol is entered?

I would be collecting the frequency of the emojis used i.e I would create a new prop called frequency and I would note the usage frequency and 
when I find the ":" in the value I would should emojis which are average of the frequency count and above.
For to collect I can get the emoji from the sentence in the saveMessage function using regex and add to the frequency.