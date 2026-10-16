/* U-39 V0.4.1 — instalabilidade e aviso de validação (somente UI) */
(()=>{
  'use strict';
  const validationBtn=document.getElementById('u39ValidationBtn');
  const validationDlg=document.getElementById('u39ValidationDialog');
  const installBtn=document.getElementById('u39InstallBtn');
  const installDlg=document.getElementById('u39InstallDialog');
  const installStatus=document.getElementById('u39InstallStatus');
  const installSteps=document.getElementById('u39InstallSteps');
  let deferredInstallPrompt=null;
  let installed=(window.matchMedia&&window.matchMedia('(display-mode: standalone)').matches)||window.navigator.standalone===true;
  const ua=navigator.userAgent||'';
  const isApple=/iPhone|iPad|iPod/i.test(ua)||(/Macintosh/i.test(ua)&&navigator.maxTouchPoints>1);
  const isAndroid=/Android/i.test(ua);
  function openDlg(dialog){
    if(typeof dialog.showModal==='function')dialog.showModal();
    else dialog.setAttribute('open','');
  }
  function closeDlg(dialog){if(typeof dialog.close==='function')dialog.close();else dialog.removeAttribute('open');}
  document.querySelectorAll('[data-close-dialog]').forEach(btn=>{
    btn.addEventListener('click',()=>{const d=btn.closest('dialog');if(d)closeDlg(d);});
  });
  [validationDlg,installDlg].forEach(dialog=>{
    dialog.addEventListener('click',e=>{if(e.target===dialog)closeDlg(dialog);});
  });
  validationBtn.addEventListener('click',()=>openDlg(validationDlg));
  const technicalBtn=document.getElementById('u39OpenValidation');
  technicalBtn.addEventListener('click',()=>{
    closeDlg(validationDlg);
    if(typeof window.goPage==='function')window.goPage('validacao');
    else document.querySelector('[data-page="validacao"]')?.click();
  });
  function updateInstalled(){
    if(installed){installBtn.textContent='✓ App instalado';installBtn.classList.add('is-installed');}
    else{installBtn.textContent='⬇ Instalar app';installBtn.classList.remove('is-installed');}
  }
  function showInstructions(){
    if(installed){
      installStatus.textContent='O U-39 Concept já está aberto no modo aplicativo neste dispositivo.';
      installSteps.innerHTML='<p>Use o atalho da tela inicial para abrir novamente.</p>';
      return;
    }
    if(isApple){
      installStatus.textContent='No iPhone/iPad, o navegador não oferece um prompt de instalação programático.';
      installSteps.innerHTML='<ol><li>Abra este endereço no <strong>Safari</strong>.</li><li>Toque em <strong>Compartilhar</strong> (ícone de quadrado com seta).</li><li>Selecione <strong>Adicionar à Tela de Início</strong> e confirme <strong>Adicionar</strong>.</li></ol>';
    }else if(isAndroid){
      installStatus.textContent='A instalação automática ainda não está disponível neste navegador.';
      installSteps.innerHTML='<ol><li>Abra este site no <strong>Chrome</strong> do Android.</li><li>Toque no menu <strong>⋮</strong> do navegador.</li><li>Escolha <strong>Instalar aplicativo</strong> ou <strong>Adicionar à tela inicial</strong>, se disponível.</li><li>Confirme a instalação.</li></ol><p>Se a opção não aparecer, o Chrome pode ainda não ter considerado o aplicativo elegível, ou ele pode já estar instalado.</p>';
    }else{
      installStatus.textContent='Este navegador não disponibilizou a instalação automática nesta visita.';
      installSteps.innerHTML='<ol><li>Abra a página no Chrome ou Edge, em HTTPS.</li><li>Procure o ícone de instalação na barra de endereços ou no menu do navegador.</li><li>Escolha <strong>Instalar aplicativo</strong> se a opção estiver disponível.</li></ol>';
    }
  }
  window.addEventListener('beforeinstallprompt',e=>{
    e.preventDefault();
    deferredInstallPrompt=e;
    installBtn.textContent='⬇ Instalar app';
    installBtn.title='Instalação disponível neste navegador';
  });
  window.addEventListener('appinstalled',()=>{
    installed=true;
    deferredInstallPrompt=null;
    updateInstalled();
  });
  installBtn.addEventListener('click',()=>{
    if(installed){showInstructions();openDlg(installDlg);return;}
    if(deferredInstallPrompt){
      const prompt=deferredInstallPrompt;
      deferredInstallPrompt=null;
      try {
        // A chamada deve ocorrer diretamente a partir da interação do usuário.
        const result=prompt.prompt();
        Promise.resolve(result).then(()=>prompt.userChoice).then(choice=>{
          if(choice&&choice.outcome==='dismissed'){showInstructions();openDlg(installDlg);}
        }).catch(()=>{showInstructions();openDlg(installDlg);});
      }catch(_){showInstructions();openDlg(installDlg);}
      return;
    }
    showInstructions();openDlg(installDlg);
  });
  updateInstalled();
})();
