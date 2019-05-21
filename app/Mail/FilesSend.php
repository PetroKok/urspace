<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class FilesSend extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */

    public $data;
    public $files;
    public $msg;

    public function __construct($files = [], $message = 'Guest')
    {
        $this->data = ['name' => 'Andrew'];
        $this->files = $files;
        $this->msg = $message;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $email = $this->view('email.files_send');
        foreach($this->files as $file){
            $email->attach(storage_path($file));
        }
        return $email;
    }
}
