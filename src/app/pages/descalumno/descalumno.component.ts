import { Component } from '@angular/core';

@Component({
  selector: 'app-descalumno',
  templateUrl: './descalumno.component.html',
  styleUrls: ['./descalumno.component.scss']
})
export class DescalumnoComponent {

  archivo1() {
    window.open("assets/files/Alta de paciente Unidad Bajo Costo.docx", "_blank");
  }

  archivo2() {
    window.open("assets/files/Anexo - Evaluación escolar COGNOS.docx", "_blank");
  }

  archivo3() {
    window.open("assets/files/Baja de paciente Unidad Bajo Costo.docx", "_blank");
  }

  archivo4() {
    window.open("assets/files/Canalización paciente online a presencial.docx", "_blank");
  }

  archivo5() {
    window.open("assets/files/Consentimiento de Estudio de caso para Tesis.docx", "_blank");
  }

  archivo6() {
    window.open("assets/files/Consentimiento de grabación en audio.docx", "_blank");
  }

  archivo7() {
    window.open("assets/files/Consentimiento Informado Online Maestria.docx", "_blank");
  }

  archivo8() {
    window.open("assets/files/Consentimiento Informado Presencial Maestria.docx", "_blank");
  }

  archivo9() {
    window.open("assets/files/Consentimiento para la evaluación escolar COGNOS.docx", "_blank");
  }

  archivo10() {
    window.open("assets/files/Consentimiento para solicitar información en escuela para padres.docx", "_blank");
  }
}
