import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

void main() => runApp(app());

class app extends StatelessWidget {
  const app({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: "Clothes App",
      home: Inicio(),
    );
  }
}

class Inicio extends StatefulWidget {
  const Inicio({super.key});

  @override
  State<Inicio> createState() => _InicioState();
}

class _InicioState extends State<Inicio> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("MiApp"),
      ),
      body: Center(
        child: Text("Bienvenido a MiApp!"),
      ),
    );
  }
}