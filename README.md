# Nature-To-Earn
#### "Rewarding people for connecting with nature"
## Overview
Nature-To-Earn (N2E) is a purpose-driven token that rewards people for getting out into nature. We believe that connecting with nature pushes people to take better care of nature. By having N2E validators facilitate nature events (e.g. hikes, mushroom forays, beach cleanups, etc), we can verify people's participation in nature events & reward them accordingly.
## Solution
To materialize our idea, we created an Incentive and reward-based platform where people attend events to learn about nature and earn while doing that.
## MVP for EthOnline Hackathon
### Roles
 - Validator/Host/Organizer: Event organizers or hosts.
 - Users: Can vote for an event proposal to be approved and can be Event participants or attendees.
### Interaction
 - The validator/organizer registers an event on the platform as the host of the event.
 - The members can vote for event proposals to be approved/accepted by the platform before users can signup for the event.
- The members can enroll for events as attendees/participants, and have to upload a proof of attendance after an event they enrolled for has ended (currently a day after the event) or they wont receive their incentives.

## Architecture
### Web3.Storage and IPFS/Filecoin
We store certain data on IPFS via web3.storage such as:
 - Event Information: This includes the Event name, location, about, start time, and end time.
 - User Enrollment information: This includes User's name, age picture, and country.
 - Attendance proof: This is just an image that serves as proof of attendance. 
 These are uploaded to IPFS and their CIDs are stored on-chain via our smart contract.

### Polygon
- The Nature-To-Earn contract exits on Polygon Mumbai Testnet which gives us the ability to run our application in a real-world environment.
- As stated above, links to events, user enrollment, and proof of attendance are saved on-chain via the contract as a point of reference.

### Worldcoin
We utilize worldcoin's proof of personhood on our platform by requesting user verification before event enrollment can be completed. This allows us to mitigate cases of bots interacting with the platform and multiple users trying to enroll more than once.

### EPNS (Ethereum Push Notification Service)
We utilize EPNS to send notifications to the attendees as a reminder of the event for which they've signed up.

### Contract 
The Nature-To-Earn contract is an ERC721 contract which handles features such as registering an event, voting for an event to be approved/accepted, signing up for an event, verifying users during signup, accepting proof of attendance, and minting NFTs as rewards for the attendees of an event.

### DApp
The frontend is built using ethers.js, wagmi, and Next.js.
The backend is built with Solidity and Hardhat.

## Future Improvements
### EPNS
We could implement a feature where users receive notifications few hours or a day to the event's scheduled start time. 

### UI/UX
The general user interface and experience would need more attention to make it better than what it is now and make interaction much simple and smoother for users.

### DAO Event Voting
The current state of the DAO allows any member to vote for/against an event proposal once with a wallet, we could make this more unique by adding worldcoin verification to the voting process, since a user can have multiple wallets but a single worldcoin identity.

### Incentives
Currently only NFTs are awarded as incentives which are tokens that can't be easily liquidated, we would be looking to implement ERC20 Tokens as incentives alongside NFTs to give users multiple options to claim from.

