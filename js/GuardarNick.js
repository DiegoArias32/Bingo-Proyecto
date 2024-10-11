function updateId() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Se cambiará tu nombre de usuario.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cambiar!'
    }).then((result) => {
      if (result.isConfirmed) {
        const newId = document.getElementById("new-id").value;
        document.getElementById("bingo-id").textContent = newId;
        Swal.fire(
          '¡Cambiado!',
          '',
          'success'
        )
      }
    })
  }