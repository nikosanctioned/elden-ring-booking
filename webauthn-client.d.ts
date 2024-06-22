// Import types from @simplewebauthn/types if needed
import {
  PublicKeyCredentialRequestOptionsJSON,
  PublicKeyCredentialCreationOptionsJSON,
} from "@simplewebauthn/types";

// Assuming webauthnScript is a function, define its signature here
// Adjust the function signature according to the actual implementation
export declare function webauthnScript(
  options:
    | PublicKeyCredentialRequestOptionsJSON
    | PublicKeyCredentialCreationOptionsJSON
): Promise<void>;
