package dev.yashk.riotalk.auth

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.util.Log
import androidx.activity.result.IntentSenderRequest
import androidx.credentials.*
import androidx.credentials.provider.BeginSignInRequest
import androidx.credentials.provider.CredentialProviderException
import androidx.credentials.provider.GetCredentialRequest
import androidx.credentials.provider.PendingIntentHandler
import androidx.credentials.provider.google.GoogleIdTokenCredential
import com.google.android.libraries.identity.googleid.GetGoogleIdOption
import com.google.android.libraries.identity.googleid.GoogleIdTokenRequestOptions

class GoogleSignInManager(
    private val context: Context
) {
    private val credentialManager = CredentialManager.create(context)

    suspend fun launchGoogleSignIn(): IntentSenderRequest? {
        val request = GetCredentialRequest(
            listOf(
                GetGoogleIdOption(
                    serverClientId = "YOUR_WEB_CLIENT_ID", // from Firebase
                    filterByAuthorizedAccounts = false
                )
            )
        )

        return try {
            val result = credentialManager.getCredential(context as Activity, request)
            null
        } catch (e: GetCredentialException) {
            if (e is GetCredentialProviderException) {
                e.pendingIntent?.let {
                    IntentSenderRequest.Builder(it.intentSender).build()
                }
            } else {
                null
            }
        }
    }

    fun handleGoogleCredential(intent: Intent): String? {
        val credential = CredentialManager.create(context)
            .getCredentialFromIntent(intent) as? GoogleIdTokenCredential

        return credential?.idToken // Send this to backend
    }
}
