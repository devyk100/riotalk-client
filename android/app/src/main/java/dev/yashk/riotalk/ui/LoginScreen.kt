package dev.yashk.riotalk.ui

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun LogicScreen(
    onClickSignIn: () -> Unit
) {
    Box(modifier = Modifier.fillMaxSize(), contentAlignment =  Alignment.Center) {
        Button(onClick = onClickSignIn, modifier = Modifier.padding(16.dp)) {
            Text("Sign In with Google")
        }
    }
}