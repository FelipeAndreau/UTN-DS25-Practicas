const Contacto = () => {
    return (
        <div className="form">
            <form>
                <div className="name">
                    <label>
                        Nombre <br />
                        <input type="text" placeholder="Fabricio" />
                    </label>
                </div>

                <div className="surname">
                    <label>
                        Apellido <br />
                        <input type="text" placeholder="Pérez" />
                    </label>
                </div>

                <div className="email">
                    <label>
                        Email <br />
                        <input type="email" placeholder="fabriper@gmail.com" />
                    </label>
                </div>

                <div className="txta">
                    <label>
                        Mensaje <br />
                        <textarea
                            placeholder="Dejá tu mensaje y te contactaremos a la brevedad..."
                            maxLength="200"
                            minLength="15"
                        ></textarea>
                    </label>
                </div>

                <div className="enviar">
                    <label>
                        <input type="submit" value="ENVIAR" />
                    </label>
                </div>
            </form>
        </div>
    );
};

export default Contacto;